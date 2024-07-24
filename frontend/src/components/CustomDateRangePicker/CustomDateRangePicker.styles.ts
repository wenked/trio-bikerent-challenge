import styled from '@emotion/styled'

export const CustomDateRangePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 45vh;
    margin-bottom: 0px;
  }

  .rdrDateRangeWrapper {
    background-color: #1f49d1;
    border-radius: 20px;
  }

  .rdrWeekDay {
    color: #ffffff;
    opacity: 0.4;
    font-size: 16px;
    font-weight: 600;
    line-height: 23.52px;
  }
  .rdrMonthPicker {
    color: #fff;
  }

  .rdrMonthPicker option {
    color: #fff;
    font-size: 16px;
  }

  .rdrMonthAndYearPickers select {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }

  .rdrDays {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }

  .rdrDayPassive .rdrDayNumber span {
    opacity: 0.4;
  }
  .rdrDayDisabled {
    background-color: transparent;
  }

  .rdrDayDisabled .rdrDayNumber span {
    opacity: 0.4;
  }

  .rdrDayNumber span {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
`
