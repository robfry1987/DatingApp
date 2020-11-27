using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime Now { get; internal set; }

        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age))
                age--;
            return age;
        }
    }
}
