# Quick Sort

!!! note Runtime
    | Best    | Average | Worst |
    | ------- | ------- | ----- |
    | n log n | n log n | n^2^  |

!!! note Other Information
    | Memory | Stable | Method       |
    | ------ | ------ | ------------ |
    | log n  | No     | Partitioning | 

!!! note Pseudocode
    ```
        algorithm quicksort(A, lo, hi) is
            if lo < hi then
                p := partition(A, lo, hi)
                quicksort(A, lo, p - 1)
                quicksort(A, p + 1, hi)

        algorithm partition(A, lo, hi) is
            pivot := A[hi]
            i := lo
            for j := lo to hi do
                if A[j] < pivot then
                    swap A[i] with A[j]
                    i := i + 1
            swap A[i] with A[hi]
            return i
    ```
