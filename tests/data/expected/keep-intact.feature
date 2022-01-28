@a @a @b
Feature: Test
  Feature desc

  Background: Background name
    Background description

    Given step
      | param |
      | a     |
      | a     |
      | b     |
    When step
    Then step

  @b @c @c @d
  Scenario: Scenario name
    Scenario description

    Given step
      | param |
      | a     |
      | a     |
      | b     |
    When step
    Then step

  @b @c @c @d
  Scenario Outline: Scenario outline name
    Scenario outline description

    Given step <param_a>
      | param |
      | a     |
      | a     |
      | b     |
    When step <param_b>
    Then step <param_c>

    @d @e @e @f
    Examples:
      | param_a | param_b | param_c |
      | a       | b       | c       |
      | a       | b       | c       |
      | a       | a       | c       |
      | a       | b       | a       |

    @d @e @e @f
    Examples:
      | param_a | param_b | param_c |
      | a       | b       | c       |
      | a       | b       | c       |
      | a       | a       | c       |
      | a       | b       | a       |