@feature @feature_duplicate
Feature: Test
  Feature desc

  @rule @rule_duplicate
  Rule: Rule name
    Rule description

    Background: Background name
      Background description

      Given step
        | param     |
        | duplicate |
        | given     |
      When step
        | param     |
        | duplicate |
        | when      |
      Then step
        | param     |
        | duplicate |
        | then      |
      And step

    @scenario @scenario_duplicate
    Scenario: Scenario name
      Scenario description

      Given step
        | param     |
        | duplicate |
        | given     |
      When step
        | param     |
        | duplicate |
        | when      |
      Then step
        | param     |
        | duplicate |
        | then      |
      And step

    @scenario_outline @scenario_outline_duplicate
    Scenario Outline: Scenario outline name
      Scenario outline description

      Given step <param_a>
        | param     |
        | duplicate |
        | given     |
      When step <param_b>
        | param     |
        | duplicate |
        | when      |
      Then step <param_c>
        | param     |
        | duplicate |
        | then      |
      And step

      @examples @examples_duplicate
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |
        | a       | a       | c       |
        | a       | b       | a       |

      @examples @examples_duplicate
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |
        | a       | a       | c       |
        | a       | b       | a       |