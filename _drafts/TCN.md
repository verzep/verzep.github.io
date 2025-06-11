```python
import torch
from torch import nn
```

Let assume we have a sequence of len 8.


```python
input_signal = torch.randn(#1, #batch
                           1, #channels
                           8) #time
print(input_signal)

```

    tensor([[-1.3639,  1.9589,  1.4127, -1.5098, -0.1000, -0.8651, -0.5435,  0.0509]])


We want to apply a 1d convolution this input time series. We take a kernel size of 3 with 1 filter.


```python
net = nn.Conv1d(in_channels=1, out_channels=1, kernel_size=3)
out = net(input_signal)
print(out.detach())
```

    tensor([[-0.1855, -0.9900, -0.6422, -0.9425,  0.8591,  0.1868]])


We notice that the `len` is shorter than the original sequence. This is because we do not do any padding, so the sequence length is actually:

$$
T_{out} = T_{in} - (k -1)
$$

where $k$ is the kernel size (so, 8 - (3-1)) = 6.

### DILATION
TCN work in a similar way, with an addictional factor called _dilation_.
Dilation increases the _receptive field_ size of a network at a low computational cost.
Let us now perform a similar convolution, but with a dilation $D= 2$.


```python
net = nn.Conv1d(in_channels=1, out_channels=1, kernel_size=3, dilation=2)
out = net(input_signal)
print(out.detach())
```

    tensor([[ 0.3475, -0.1530,  0.2150,  0.5558]])


As we see, the output has now radically changed. Moreover, it is shorter. When we consider a dilation, the formula for computing the output length is

$$
T_{out} = T_{in} - (k-1)*D
$$

Of course, this boils down to ''regular'' convolution when $D=1$.

Another important thing to consider is the Receptive Field Size (RFS), i.e., how much of the time series each ouput node sees for computation.
In this simple case the formulas is

$$
RFS = (k-1)*D + 1
$$

So, for the first case we had an RFS=3 (the kernel size), while now we had a RFS=5.

### PADDING

When working with time series, we usually want the network to be _causal_, i.e., without looking into the future. For this we need _padding_.
We need to use zero-padding to the left of the sequence.
Unfortunatly, the implementation of `Conv1d` in Pytorch can only do symmetric padding, so we need to do it ecplivitely.

The size of the padding for having a sequence of exacly the same length as the input depends on both the kernel size and the dilation

$$
Padding = (k-1)*D
$$



```python
apply_pad = nn.ZeroPad1d(padding=(4,0),)
padded_signal = apply_pad(input_signal)
print(padded_signal)
```

    tensor([[ 0.0000,  0.0000,  0.0000,  0.0000,  0.6003, -1.5493, -0.6087, -0.0306,
              0.2537,  1.5011, -1.5054, -0.6932]])


And once we apply this padding, we obtain the correct sequence length:


```python
out = net(padded_signal)
print(out.detach())
```

    tensor([[ 0.2824,  0.3343,  0.4117,  0.0393,  0.3475, -0.1530,  0.2150,  0.5558]])


### Residual block

The final element we need to introduce is the _residual block_. The residual block consists of two dilated causal convolutions with weight normalization, non-linear activation, and dropout in between. These residual blocks are then stacked on top of each other to build a network that has a receptive field size that fits the task at hand.



```python
input_signal = torch.randn(1, #batch
                           1, #channels
                           8) #time

residual_block = nn.Sequential(nn.ZeroPad1d((4,0)),
                                nn.Conv1d(in_channels=1, out_channels=1, kernel_size=3, dilation=2),
                                nn.ReLU(inplace=True),
                                nn.Dropout(p=0.1),
                                nn.ZeroPad1d((4,0)),
                                nn.Conv1d(in_channels=1, out_channels=1, kernel_size=3, dilation=2),
                                nn.ReLU(inplace=True),
                                nn.Dropout(p=0.1),
                                )
out = residual_block(input_signal)
print(out.detach().size())
```

    torch.Size([1, 1, 8])


Now, we would like our residual block to have actualy residual connections (as the name suggests), as since they are a _parallel_ operation we cannot use `nn.Sequential`.


```python

class residual_block_TCN(nn.Module):
  def __init__(self, in_channels,out_channels, k, d, p, activation = "GELU"):
        super().__init__()
        self.zero_pad = nn.ZeroPad1d(padding=((k-1)*d,0))

        # time convolution
        self.activation = getattr(nn,activation)()

        self.conv1 = nn.Conv1d(in_channels=in_channels, out_channels=out_channels, kernel_size=k, dilation=d)

        self.conv2 = nn.Conv1d(in_channels=out_channels, out_channels=out_channels, kernel_size=k, dilation=d)


        self.first_layer = nn.Sequential(self.zero_pad,
                                    nn.utils.parametrizations.weight_norm(self.conv1),
                                    self.activation,
                                    nn.Dropout(p))

        self.second_layer = nn.Sequential(self.zero_pad,
                                    nn.utils.parametrizations.weight_norm(self.conv2),
                                    self.activation,
                                    nn.Dropout(p))

        # residual
        self.residual = (
            nn.Conv1d(in_channels, out_channels, kernel_size=1) if in_channels != out_channels else nn.Identity()
        )

  def forward(self, x):
        y = self.first_layer(x)
        y = self.second_layer(y)
        # residual
        out = self.residual(x) + y
        return out

input_signal = torch.randn(1, #batch
                           1, #channels
                           8) #time
net = residual_block_TCN(in_channels=1, out_channels=1, k=3, d=2, p = 0.1)
out = net(input_signal)
print(out.detach().size())
```

    torch.Size([1, 1, 8])


We can stack multiple blocks now



```python
block_1 = residual_block_TCN(in_channels=1, out_channels=1, k=3, d=2, p = 0.1)
block_2 = residual_block_TCN(in_channels=1, out_channels=1, k=3, d=4, p = 0.1)

net = nn.Sequential(block_1, block_2)
out = net(input_signal)
print(out.detach().size())
```

    torch.Size([1, 1, 8])



```python
different_input = torch.randn(4, #batch
                           3, #channels
                           24) #time

block_1 = residual_block_TCN(in_channels=3, out_channels=5, k=3, d=2, p = 0.1)
block_2 = residual_block_TCN(in_channels=5, out_channels=3, k=3, d=4, p = 0.1)
net = nn.Sequential(block_1, block_2)

out = net(different_input)
print(out.detach().size())
```

    torch.Size([4, 3, 24])


Usually, one increases the dilation exponentially for every layer.
If we wonder what is the RFS of such a network id, we need to consider that each residual block will have a RFS of $2 \times (k-1) \times D$.
Since at each $D$ increase exponentially, we have that for a network with $N$ layers

$$
RFS_{N} =  1 + \sum_{i=1}^N 2 D^{i-1} (k-1) = 1 + 2(k-1)\frac{D^N-1}{D-1}
$$


```python

```

### ECG5000 Dataset Overview

The **ECG5000** dataset is a collection of electrocardiogram (ECG) time series data, used for classification tasks. The dataset consists of 5 classes, each representing a different type of ECG signal. The dataset contains time series data sampled at 140 time points for each instance.

#### Dataset Details:
- **Number of classes**: 5
    - **Class 0**: Normal beat
    - **Class 1**: Premature ventricular contraction (PVC)
    - **Class 2**: Left bundle branch block (LBBB)
    - **Class 3**: Right bundle branch block (RBBB)
    - **Class 4**: Atrial premature contraction (APC)

- **Input data**:
    - Each time series consists of 140 data points, representing the ECG signal over time.
    - Each sample is a one-dimensional signal (single channel).

- **Training and Test Split**:
    - The dataset is divided into a training set and a test set.
    - The training set contains 3,000 samples and the test set contains 1,000 samples.

- **Target variable**:
    - The target variable corresponds to the class label of the ECG signal, with values ranging from 0 to 4.
    - The task is to classify each ECG signal into one of these 5 categories.

#### Labels:
- **Class 0**: Normal beat
- **Class 1**: Premature ventricular contraction (PVC)
- **Class 2**: Left bundle branch block (LBBB)
- **Class 3**: Right bundle branch block (RBBB)
- **Class 4**: Atrial premature contraction (APC)

This dataset is useful for training and evaluating time series classification models, such as Temporal Convolutional Networks (TCNs), to classify ECG signals based on their morphology.


```python
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the training and testing data separately
train_data = np.loadtxt("ECG5000_TRAIN.txt")
test_data = np.loadtxt("ECG5000_TEST.txt")

# Separate features and labels for train and test sets
X_train = train_data[:, 1:]  # Features (140 time points) for training
y_train = train_data[:, 0].astype(int) - 1  # Labels for training (0 to 4)

X_test = test_data[:, 1:]  # Features (140 time points) for testing
y_test = test_data[:, 0].astype(int) - 1  # Labels for testing (0 to 4)

# Normalize the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)  # Fit on training data
X_test = scaler.transform(X_test)  # Use the same scaler to transform the test data

# Check shape of data
print(f"Training Data shape: {X_train.shape}")
print(f"Test Data shape: {X_test.shape}")
print(f"Training Labels shape: {y_train.shape}")
print(f"Test Labels shape: {y_test.shape}")
```

    Training Data shape: (500, 140)
    Test Data shape: (4500, 140)
    Training Labels shape: (500,)
    Test Labels shape: (4500,)



```python
from torch.utils.data import Dataset, DataLoader

class ECGDataset(Dataset):
    def __init__(self, X, y):
        """
        Args:
            X (numpy array): Feature matrix of shape (num_samples, num_features)
            y (numpy array): Label array of shape (num_samples,)
        """
        self.X = torch.tensor(X, dtype=torch.float32).unsqueeze(1)  # Add channel dimension
        self.y = torch.tensor(y, dtype=torch.long)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Create the training and test datasets
train_dataset = ECGDataset(X_train, y_train)
test_dataset = ECGDataset(X_test, y_test)

# Create DataLoader objects for batching
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

# Check the DataLoader setup by inspecting one batch
for X_batch, y_batch in train_loader:
    print(f"X_batch shape: {X_batch.shape}")
    print(f"y_batch shape: {y_batch.shape}")
    break  # Only print the first batch

```

    X_batch shape: torch.Size([32, 1, 140])
    y_batch shape: torch.Size([32])



```python
import matplotlib.pyplot as plt
import random

# Function to plot a few samples from the dataset with their labels
def plot_samples_from_dataset(X, y, num_samples=4):
    fig, axes = plt.subplots(1, num_samples, figsize=(15, 4))

    # Randomly select 4 samples
    indices = random.sample(range(len(X)), num_samples)

    for i, idx in enumerate(indices):
        axes[i].plot(X[idx])  # Plot time series for the i-th sample
        axes[i].set_title(f"Label: {y[idx]}")
        axes[i].set_xlabel('Time')
        axes[i].set_ylabel('Amplitude')

    plt.tight_layout()
    plt.show()

# Plot 4 random samples from the train set
plot_samples_from_dataset(X_train, y_train, num_samples=4)

```

![png](2025-05-02/TCN_examples_26_0.png)
    



```python
class TCN(nn.Module):
    def __init__(self, in_channels, out_channels, num_blocks, k, d, p, num_classes):
        super(TCN, self).__init__()

        # Stack residual blocks
        self.blocks = nn.ModuleList(
            [residual_block_TCN(in_channels if i == 0 else out_channels,
                                out_channels, k, d**(i+1), p) for i in range(num_blocks)]
        )

        # Output layer: fully connected (classification head)
        self.fc = nn.Linear(out_channels, num_classes)

    def forward(self, x):
        # Pass through all the residual blocks
        for block in self.blocks:
            x = block(x)

        # Global average pooling
        x = x.mean(dim=-1)  # Average over time dimension

        # Final classification layer
        out = self.fc(x)
        return out

```


```python
import torch.optim as optim

# Initialize the model
model = TCN(in_channels=1, out_channels=64, num_blocks=4, k=3, d=2, p=0.1, num_classes=5)

# Set up the loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)


# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# Training loop
num_epochs = 100
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0

    for X_batch, y_batch in train_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)

        optimizer.zero_grad()

        # Forward pass
        outputs = model(X_batch)

        # Compute loss
        loss = criterion(outputs, y_batch)
        loss.backward()

        # Update parameters
        optimizer.step()

        # Metrics
        running_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        total += y_batch.size(0)
        correct += (predicted == y_batch).sum().item()

```



```python
# Evaluation loop (after training)
model.eval()  # Set the model to evaluation mode
correct = 0
total = 0

with torch.no_grad():  # No need to compute gradients during evaluation
    for X_batch, y_batch in test_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)

        # Forward pass
        outputs = model(X_batch)

        # Metrics
        _, predicted = torch.max(outputs, 1)
        total += y_batch.size(0)
        correct += (predicted == y_batch).sum().item()

test_accuracy = 100 * correct / total
print(f"Test Accuracy: {test_accuracy:.2f}%")
```

    Test Accuracy: 93.62%



```python

import seaborn as sns
from sklearn.metrics import confusion_matrix


# Function to plot confusion matrix
def plot_confusion_matrix(model, data_loader, device):
    # Set the model to evaluation mode
    model.eval()

    # Initialize the true labels and predicted labels lists
    true_labels = []
    pred_labels = []

    # Disable gradient computation for evaluation
    with torch.no_grad():
        for inputs, labels in data_loader:
            # Move data to device (GPU or CPU)
            inputs, labels = inputs.to(device), labels.to(device)

            # Get model predictions
            outputs = model(inputs)
            _, predicted = torch.max(outputs, 1)

            # Append true labels and predicted labels
            true_labels.extend(labels.cpu().numpy())
            pred_labels.extend(predicted.cpu().numpy())

    # Compute confusion matrix
    cm = confusion_matrix(true_labels, pred_labels)

    # Plot confusion matrix using seaborn
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", cbar=False,
                xticklabels=[f'Class {i}' for i in range(5)],
                yticklabels=[f'Class {i}' for i in range(5)])
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.show()

# Plot confusion matrix for the test set
plot_confusion_matrix(model, test_loader, device)

```


    
![png](2025-05-02/TCN_examples_30_0.png)
    



