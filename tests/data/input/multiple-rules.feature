@feature @feature_duplicate @feature_duplicate
Feature: Test
  Feature desc

  @feature @rule_1 @rule_duplicate @rule_duplicate
  Rule: Rule 1 name
    Rule description

    @feature @rule_1 @rule_2 @scenario @scenario_duplicate @scenario_duplicate
    Scenario: Scenario name
      Scenario description

      Given step
      When step
      Then step
      And step

    
  @feature @rule_2 @rule_duplicate @rule_duplicate
  Rule: Rule 2 name
    Rule description

    @feature @rule_1 @rule_2 @scenario_outline @scenario_outline_duplicate @scenario_outline_duplicate
    Scenario Outline: Scenario outline name
      Scenario outline description

      Given step <param_a>
      When step <param_b>
      Then step <param_c>
      And step

      @feature @rule_1 @rule_2 @scenario_outline @examples @examples_duplicate @examples_duplicate
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |
