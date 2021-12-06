1. DATA SEGMENT
USE global, constant variable
  HEXADECIMAL : BINARY CODE
0x[XXXXXXXX]: [XXXXXXXXX] -> [xx]
0x[XXXXXXXX]: [XXXXXXXXX] -> [xx]
0x[XXXXXXXX]: [XXXXXXXXX] -> [xx]

2. HEAP SEGMENT
- init local variable
- init variable in function

0x[XXXXXXXX]: [XXXXXXXXX] -> [xx]
0x[XXXXXXXX]: [XXXXXXXXX] -> [xx]
0x[XXXXXXXX]: [XXXXXXXXX] -> [xx]


3. STACK SEGMENT
---
- read value from segment and heap
- convert from decimal into hexadecimal code
- convert from hexadecimal into bit code

|| multi ->  [xx][mul][xx][div][ass]
|| div -> [xx][div][xx][div][xx]
|| sub -> [xx][sub][xx][div]
|| add -> [xx][div][xx][div]


> convert into bit_code
> compile function
> inp_ 10101110 01011010
> 10010010 00010000 01111110 11010011 10001010101
> out_out -------- -----------

2. Test in mocha
$ ./node_modules/mocha/bin/mocha
