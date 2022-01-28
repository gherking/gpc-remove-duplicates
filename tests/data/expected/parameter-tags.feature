@feature(1) @feature(duplicate)
Feature: Test
  Feature desc

  @rule(1) @rule(duplicate)
  Rule: Rule name
    Rule description

    Background: Background name
      Background description

      Given step
      When step
      Then step
      And step

    @scenario(1) @scenario(duplicate)
    Scenario: Scenario name
      Scenario description

      Given step
      When step
      Then step
      And step

    @scenario_outline(1) @scenario_outline(duplicate)
    Scenario Outline: Scenario outline name
      Scenario outline description

      Given step <param_a>
      When step <param_b>
      Then step <param_c>
      And step

      @examples(1) @examples(duplicate)
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |

      @examples(1) @examples(duplicate)
      Examples:
        | param_a | param_b | param_c |
        | a       | b       | c       |