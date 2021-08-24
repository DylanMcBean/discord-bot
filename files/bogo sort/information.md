# Bogo Sort

!!! note Runtime
    | Best | Average | Worst  |                       |
    | ---- | ------- | ------ | --------------------- |
    | n    | (n+1)!  | (n+1)! | determanistic version |
    | n    | (n+1)!  | *inf*  |                       |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1      | Yes    | Shuffling |

!!! note Pseudocode
    ```
        function Sorted(arr):
            return a[i] <= a[i+1] for a in range(len(arr)-1)

        function BogoSort(arr):
            while not Sorted(arr):
                shuffle(arr)
            return arr
    ```