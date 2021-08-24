# Insertion Sort

!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n | n^2^ | n^2^ |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1 | Yes | Insertion |

!!! note Pseudocode
    ```
    function insertionSortR(array A, int n)
        if n > 0
            insertionSortR(A, n-1)
            x ← A[n]
            j ← n-1
            while j >= 0 and A[j] > x
                A[j+1] ← A[j]
                j ← j-1
            end while
            A[j+1] ← x
        end if
    end function
    ```