const ValidateAccountId = (accountId) => {
  return typeof accountId === "number" && accountId > 0;
};

export { ValidateAccountId };
