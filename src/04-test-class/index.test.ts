import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const balances = 100;
  const money = 50;
  const moreThanBalance = balances + balances;
  const bankAccount = getBankAccount(balances);
  const mockAccount = getBankAccount(money);

  test('should create account with initial balance', () => {
    expect(getBankAccount(balances)).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(moreThanBalance);
    }).toThrow(new InsufficientFundsError(balances));
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(money, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(money, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    bankAccount.deposit(money);
    expect(bankAccount.getBalance()).toBe(balances + money);
  });

  test('should withdraw money', () => {
    mockAccount.withdraw(money);
    expect(mockAccount.getBalance()).toBe(money - money);
  });

  test('should transfer money', () => {
    const accToTrans = getBankAccount(money);
    bankAccount.transfer(money, accToTrans);
    expect(accToTrans.getBalance()).toBe(money + money);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const moneyOnBalance = await bankAccount.fetchBalance();
    if (moneyOnBalance) {
      expect(moneyOnBalance).toBe(moneyOnBalance);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const moneyOnBalance = await bankAccount.fetchBalance();
    if (moneyOnBalance) {
      bankAccount.deposit(moneyOnBalance);
      expect(bankAccount.getBalance()).toBe(money + moneyOnBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
