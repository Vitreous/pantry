Feature: Test Cookbook Home Page

  Scenario: Test Cookbook Title Description
    Given I visit the Pantry Website
    And I click login
    And I enter my username and password
    Then I see Welcome Test_Automation
    And I click on Recipes
    And I enter a recipe Name
    And I enter recipe Ingredients
    And I enter a recipe method
    Then I click submit to add the recipe
