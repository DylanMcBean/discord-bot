# Bubble Sort

!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n | n^2^ | n^2^ |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1 | Yes | Exchanging |

!!! note Pseudocode
    ```
    procedure bubbleSort(A : list of sortable items)
        n := length(A)
        repeat
            swapped := false
            for i := 1 to n - 1 inclusive do
                if A[i - 1] > A[i] then
                    swap(A[i - 1], A[i])
                    swapped = true
                end if
            end for
            n := n - 1
        until not swapped
    end procedure
    ```