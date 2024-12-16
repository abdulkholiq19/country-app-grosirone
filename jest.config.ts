import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Jest Test Report',  
      outputPath: './test-report.html',  
      includeFailureMsg: true,  
      includeConsoleLog: true, 
      useCssFile: true,       
    }]
  ],
};

export default config;