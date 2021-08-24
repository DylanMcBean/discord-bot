# Block Sort

!!! note Information
    * Intro sort is a Hybrid sort function, this means it takes multiple sorting algorithms and combines them into one

!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n | n log n | n log n |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1 | Yes | Insertion & Merging  |

!!! note Pseudocode
    ```
    BlockSort(array)
       power_of_two = FloorPowerOfTwo(array.size)
       scale = array.size/power_of_two // 1.0 ≤ scale < 2.0
      
       // insertion sort 16–31 items at a time
       for (merge = 0; merge < power_of_two; merge += 16)
           start = merge * scale
           end = start + 16 * scale
           InsertionSort(array, [start, end))
      
       for (length = 16; length < power_of_two; length += length)
           for (merge = 0; merge < power_of_two; merge += length * 2)
               start = merge * scale
               mid = (merge + length) * scale
               end = (merge + length * 2) * scale
              
               if (array[end − 1] < array[start])
                   // the two ranges are in reverse order, so a rotation is enough to merge them
                   Rotate(array, mid − start, [start, end))
               else if (array[mid − 1] > array[mid])
                   Merge(array, A = [start, mid), B = [mid, end))
               // else the ranges are already correctly ordered

    FloorPowerOfTwo(x)
        x = x | (x >> 1)
        x = x | (x >> 2)
        x = x | (x >> 4)
        x = x | (x >> 8)
        x = x | (x >> 16)
        if (this is a 64-bit system)
            x = x | (x >> 32)
        return x - (x >> 1)

    Rotate(array, amount, range)
        Reverse(array, range)
        Reverse(array, [range.start, range.start + amount))
        Reverse(array, [range.start + amount, range.end))

    Reverse(a[0..n-1])
        for i from 0 to floor((n-2)/2)
            tmp := a[i]
            a[i] := a[n − 1 − i]
            a[n − 1 − i] := tmp
    ```