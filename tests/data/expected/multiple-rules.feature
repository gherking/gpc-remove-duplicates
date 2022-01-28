@feature @feature_duplicate
Feature: Test
  Feature desc

  @rule_1 @rule_duplicate
  Rule: Rule 1 name
    Rule description

    @rule_2 @scenario @scenario_duplicate
    Scenario: Scenario name
      Scenario description

      Given step
      When step
      Then step
      And step

    
  @rule_2 @rule_duplicate
  Rule: Rule 2 name
    Rule description

    @rule_1 @scenario_outline @scenario_outline_duplicate
    Scenario Outline: Scenario outline name
      Scenario outline description

      Given step <param_a>
      When step <param_b>
      Then step <param_c>
      And step

      @examples @examples_duplicate
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |
