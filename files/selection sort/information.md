# Selection Sort

!!! note Runtime
    | Best    | Average | Worst   |
    | ------- | ------- | ------- |
    | n^2^ | n^2^ | n^2^ |

!!! note Other Information
    | Memory | Stable | Method  |
    | ------ | ------ | ------- |
    | 1 | No | Selection |

!!! note Pseudocode
    ```
    Function SelectionSort(A)
        N := Length of A
        For I = 0 to N-1 do:
            Smallsub = I
            For J = I + 1 to N-1 do:
                If A(J) < A(Smallsub)
                Smallsub = J
                End-If
            End-For
            Temp = A(I)
            A(I) = A(Smallsub)
            A(Smallsub) = Temp
        End-For
    ```