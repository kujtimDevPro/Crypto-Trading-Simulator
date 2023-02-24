const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formateDate = date => {
    if (date) {
        const wrapDate = new Date(date);
        return `${monthNames[wrapDate.getMonth()]} ${wrapDate.getFullYear()}`
    } else {
        return "Month Year"
    }
}

export default formateDate;