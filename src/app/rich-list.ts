export interface IRichList {
    pageTitleH1: String;
    pageTitleH2: String;
    description: String;
    referenceLink: String;
    usDollarValue: Number;
    australianDollarValue: Number;
    euroValue: Number;
    celebrityList: [
        {
            rank: Number;
            name: String;
            netWorth: Number;
            age: Number;
            country: String;
        }
    ];
}
