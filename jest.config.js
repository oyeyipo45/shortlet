module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@Common/(.*)$': '<rootDir>/src/common/$1',
    '^@Config/(.*)$': '<rootDir>/src/config/$1',
    '^@ExternalAPI/(.*)$': '<rootDir>/src/externalAPI/$1',
    '^@Countries/(.*)$': '<rootDir>/src/countries/$1',
    '^@Health/(.*)$': '<rootDir>/src/health/$1',
    '^@Utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@Tests/(.*)$': '<rootDir>/e2e/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
