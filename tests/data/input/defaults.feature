@feature @feature_duplicate @feature_duplicate
Feature: Test
  Feature desc

  Background: Background name
    Background description

    Given step
      | param     |
      | duplicate |
      | duplicate |
      | given     |
    When step
      | param     |
      | duplicate |
      | duplicate |
      | when      |
    Then step
      | param     |
      | duplicate |
      | duplicate |
      | then      |
    And step

  @feature @scenario @scenario_duplicate @scenario_duplicate
  Scenario: Scenario name
    Scenario description

    Given step
      | param     |
      | duplicate |
      | duplicate |
      | given     |
    When step
      | param     |
      | duplicate |
      | duplicate |
      | when      |
    Then step
      | param     |
      | duplicate |
      | duplicate |
      | then      |
    And step

  @feature @scenario_outline @scenario_outline_duplicate @scenario_outline_duplicate
  Scenario Outline: Scenario outline name
    Scenario outline description

    Given step <param_a>
      | param     |
      | duplicate |
      | duplicate |
      | given     |
    When step <param_b>
      | param     |
      | duplicate |
      | duplicate |
      | when      |
    Then step <param_c>
      | param     |
      | duplicate |
      | duplicate |
      | then      |
    And step

    @feature @scenario_outline @examples @examples_duplicate @examples_duplicate
    Examples:
      | param_a | param_b | param_c |
      | a       | b       | c       |
      | a       | b       | c       |
      | a       | a       | c       |
      | a       | b       | a       |

    @feature @scenario_outline @examples @examples_duplicate @examples_duplicate
    Examples:
      | param_a | param_b | param_c |
      | a       | b       | c       |
      | a       | b       | c       |
      | a       | a       | c       |
      | a       | b       | a       |