export const handleReminderChange = (setRemindersChecked, key) => {
  setRemindersChecked((prevState) => ({
    ...prevState,
    [key]: !prevState[key],
  }));
};
