# Shell Sort

!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n log n | n^4/3^ | n^3/2^ |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1 | No | Insertion |

!!! note Pseudocode
    ```
    # Start with the largest gap and work down to a gap of 1
    foreach (obj in array)
    {
        # Do a gapped insertion sort for this gap size.
        # The first gap elements a[0..obj-1] are already in gapped order
        # keep adding one more element until the entire array is gap sorted
        for (i = obj; i < n; i += 1)
        {
            # add a[i] to the elements that have been gap sorted
            # save a[i] in temp and make a hole at position i
            temp = a[i]
            # shift earlier gap-sorted elements up until the correct location for a[i] is found
            for (j = i; j >= obj and a[j - obj] > temp; j -= obj)
            {
                a[j] = a[j - obj]
            }
            # put temp (the original a[i]) in its correct location
            a[j] = temp
        }
    }
    ```