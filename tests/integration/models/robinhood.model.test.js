/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const assert = require('chai').assert;
const Robinhood = require('../../../src/main');
const credentials = require('../../../test-credentials.config');

describe('Robinhood', () => {
    let robinhood;

    before(async () => {
        robinhood = await Robinhood.create(credentials);
    });

    describe('user object', () => {
        it('should be set with defined basic fields', async () => {
            assert.isNotNull(robinhood);
            assert.isString(robinhood.user.createdAt);
            assert.isString(robinhood.user.email);
            assert.isString(robinhood.user.firstName);
            assert.isString(robinhood.user.lastName);
            assert.isString(robinhood.user.id);
            assert.isString(robinhood.user.lastName);
            assert.isString(robinhood.user.username);

            assert.isString(robinhood.user.phoneNumber);
            assert.isString(robinhood.user.taxIdSsn);
            assert.isString(robinhood.user.address);
            assert.isString(robinhood.user.dateOfBirth);
            assert.isString(robinhood.user.state);
            assert.isString(robinhood.user.countryOfResidence);
            assert.isString(robinhood.user.zipcode);
            assert.isString(robinhood.user.martialStatus);
            assert.isString(robinhood.user.phoneNumber);
            assert.isString(robinhood.user.city);
            assert.isNumber(robinhood.user.numberDependents);
            assert.isString(robinhood.user.citizenship);
            assert.isString(robinhood.user.updatedAt);
            assert.isString(robinhood.user.account.id);
            assert.isString(robinhood.user.account.url);
            assert.isNumber(robinhood.user.account.marketValue);
        });

        it('should be set with account property defined', async () => {
            assert.isNotNull(robinhood);
            assert.isNotNull(robinhood.user);
            assert.isNotNull(robinhood.user.account);
            assert.isNumber(robinhood.user.account.marketValue);
            assert.isNumber(robinhood.user.account.excessMaintenanceWithUnclearedDeposits);
            assert.isNumber(robinhood.user.account.equity);
        });
    });

    describe('quote', () => {
        it('should allow access to a quote', async () => {
            let stockSymbol = 'AAPL';

            let quote = await robinhood.quote(stockSymbol);

            assert.isString(quote.askPrice);
            assert.isNumber(quote.askSize);
            assert.isString(quote.bidPrice);
            assert.isNumber(quote.bidSize);
            assert.isString(quote.lastTradePrice);
        });
    });

    describe('buy', () => {
        it('should allow you to buy a stock using limit type and then remove it', async () => {
            let stockSymbol = 'AAPL';
            let buyResponse = await robinhood.buy({
                stockSymbol: stockSymbol,
                quantity: 1,
                orderType: Robinhood.OrderType.LIMIT,
                price: 1.00
            });
            let cancelResponse = await robinhood.cancelOrder(buyResponse.id);

            assert.isDefined(buyResponse);
            assert.isString(buyResponse.created_at);
            assert.equal(buyResponse.side, 'buy');
            assert.isDefined(cancelResponse);
        });
    });

    xdescribe('sell', () => {
        it('should allow you to sell a stock using limit type and then remove it', async () => {
            let stockSymbol = 'AAPL';
            let response = await robinhood.sell({
                stockSymbol: stockSymbol,
                quantity: 1,
                orderType: Robinhood.OrderType.LIMIT,
                price: 1.00
            });

            let cancelResponse = await robinhood.cancelOrder(response.id);

            assert.isDefined(response);
            assert.isString(response.created_at);
            assert.equal(response.side, 'sell');
            assert.isDefined(cancelResponse);
        });
    });
});
