// lib/erc721-abi.ts
export const abi = [
  {
    type: 'function',
    name: 'mintTo',
    inputs: [
      {
        type: 'address',
        name: '_to',
        internalType: 'address',
      },
      {
        type: 'string',
        name: '_uri',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
] as const;
