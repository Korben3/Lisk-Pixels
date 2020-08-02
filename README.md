# Lisk-Pixels
Create pixel art on the blockchain. A fun educational project build with the [Lisk SDK](http://lisk.io).

### Docs and Demo

For a live demo: [liskpixels.korben3.com](http://liskpixels.korben3.com)

For the public API: http://95.179.253.231:4000

Example calls:

- [View board account](http://95.179.253.231:4000/api/accounts?address=1234567890L)
- [See the status of the node](http://95.179.253.231:4000/api/node/status)
- [Watch the 10 latest transactions](http://95.179.253.231:4000/api/transactions?sort=timestamp%3Adesc&limit=10)

For client documentation: [Client - Readme](https://github.com/Korben3/Lisk-Pixels/tree/master/client)

For Server documentation: [Server - Readme](https://github.com/Korben3/Lisk-Pixels/tree/master/server)

You can find helpful tools and examples to make transactions in the [server/tools](https://github.com/Korben3/Lisk-Pixels/tree/master/server/tools) directory.

### Custom transactions

There are 2 custom transactions implemented:

**Type 101 - create-board_transaction - Create a board and set the first pixel - Fee: 1000 LPX**
```
Pixel object:
 id: number (<= total pixels of the board)
 color: string (0-F)
```

**Type 102 - set-pixel_transaction - Register as a board member - Fee: 1 LPX**
```
Pixel object:
 id: number (<= total pixels of the board)
 color: string (0-F)
 ```
