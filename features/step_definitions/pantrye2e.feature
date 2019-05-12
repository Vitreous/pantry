Feature: Test Cookbook Home Page

  Scenario: Test Cookbook Title Description
    Given I visit the Pantry Website
    And I click login
    And I enter my username and password
    Then I see Welcome Test_Automation
