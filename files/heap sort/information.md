# Heap Sort
!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n log n | n log n | n log n |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1 | No | Selection |

!!! note Pseudocode
    ```
        procedure heapsort(a, count) is
            input: an unordered array a of length count
        
            (Build the heap in array a so that largest value is at the root)
            heapify(a, count)

            (The following loop maintains the invariants that a[0:end] is a heap and every element
            beyond end is greater than everything before it (so a[end:count] is in sorted order))
            end ← count - 1
            while end > 0 do
                (a[0] is the root and largest value. The swap moves it in front of the sorted elements.)
                swap(a[end], a[0])
                (the heap size is reduced by one)
                end ← end - 1
                (the swap ruined the heap property, so restore it)
                siftDown(a, 0, end)
    ```