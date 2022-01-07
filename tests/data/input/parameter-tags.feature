@feature(1) @feature(duplicate) @feature(duplicate)
Feature: Test
  Feature desc

  @feature(1) @rule(1) @rule(duplicate) @rule(duplicate)
  Rule: Rule name
    Rule description

    Background: Background name
      Background description

      Given step
      When step
      Then step
      And step

    @feature(1) @scenario(1) @scenario(duplicate) @scenario(duplicate)
    Scenario: Scenario name
      Scenario description

      Given step
      When step
      Then step
      And step

    @feature(1) @scenario_outline(1) @scenario_outline(duplicate) @scenario_outline(duplicate)
    Scenario Outline: Scenario outline name
      Scenario outline description

      Given step <param_a>
      When step <param_b>
      Then step <param_c>
      And step

      @feature(1) @scenario_outline(1) @examples(1) @examples(duplicate) @examples(duplicate)
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |

      @feature(1) @scenario_outline(1) @examples(1) @examples(duplicate) @examples(duplicate)
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |