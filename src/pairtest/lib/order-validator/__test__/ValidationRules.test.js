import { ValidateAccountId } from "../ValidationRules";

test.each`
  testAccountId | expectedResponse
  ${0}          | ${false}
  ${1}          | ${true}
  ${10}         | ${true}
  ${999999}     | ${true}
  ${"1"}        | ${false}
  ${"otherStr"} | ${false}
  ${{}}         | ${false}
  ${-1}         | ${false}
`(
  "ValidateAccountId should respond with $expectedResponse if called with $testAccountId",
  ({ testAccountId, expectedResponse }) => {
    expect(ValidateAccountId(testAccountId)).toEqual(expectedResponse);
  }
);
