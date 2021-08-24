const payoutChart = [
    { name: ':octopus:',        description: '`x3 500:1, x2 25:1`' },
    { name: ':chicken:',        description: '`x3 100:1, x2 20:1`' },
    { name: ':hedgehog:',       description: '`x3 80:1 , x2 15:1`' },
    { name: ':hatching_chick:', description: '`x3 45:1 , x2 10:1`' },
    { name: ':orangutan:',      description: '`x3 27:1 , x2 4:1 `' },
    { name: ':raccoon:',        description: '`x3 18:1 , x2 3:1 `' },
    { name: ':whale:',          description: '`x3 11:1 , x2 2:1 `' },
    { name: ':deer:',           description: '`x3 5:1  , x2 1:1 `' },
    { name: ':owl: ',           description: '`x3 2:1  , x2 1:2 `' }
];

const payout2xMultiplier = {
    ':octopus:':        [25, 1],
    ':chicken:':        [20, 1],
    ':hedgehog:':       [15, 1],
    ':hatching_chick:': [10, 1],
    ':orangutan:':      [4, 1],
    ':raccoon:':        [3, 1],
    ':whale:':          [2, 1],
    ':deer:':           [1, 1],
    ':owl:':            [1, 2]
};

const payout3xMultiplier = {
    ':octopus:':        [500, 1],
    ':chicken:':        [100, 1],
    ':hedgehog:':       [80, 1],
    ':hatching_chick:': [45, 1],
    ':orangutan:':      [27, 1],
    ':raccoon:':        [18, 1],
    ':whale:':          [11, 1],
    ':deer:':           [5, 1],
    ':owl:':            [2, 1]
};

module.exports = {payoutChart, payout2xMultiplier, payout3xMultiplier};