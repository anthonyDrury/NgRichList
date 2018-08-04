export interface IRichList {
    pageTitleH1: string;
    pageTitleH2: string;
    description: string;
    referenceLink: string;
    usDollarValue: number;
    australianDollarValue: number;
    euroValue: number;
    celebrityList: [
        {
            rank: number;
            name: string;
            netWorth: number;
            age: number;
            country: string;
        }
    ];
}
