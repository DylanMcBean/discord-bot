# Intro Sort
!!! note Information
    * Intro sort is a Hybrid sort function, this means it takes multiple sorting algorithms and combines them into one

!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n log n | n log n | n log n |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | log n | No | Partitioning & Selection |

!!! note Pseudocode
    ```
        procedure sort(A : array):
            let maxdepth = ⌊log(length(A))⌋ × 2
            introsort(A, maxdepth)

        procedure introsort(A, maxdepth):
            n ← length(A)
            if n ≤ 1:
                return  // base case
            else if maxdepth = 0:
                heapsort(A)
            else:
                p ← partition(A)  // assume this function does pivot selection, p is the final position of the pivot
                introsort(A[0:p-1], maxdepth - 1)
                introsort(A[p+1:n], maxdepth - 1)
    ```