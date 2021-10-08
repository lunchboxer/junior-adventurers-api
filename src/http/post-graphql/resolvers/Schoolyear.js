const data = require('@begin/data')

module.exports.Schoolyear = {
  schoolyear: async (_, { key }) => {
    return await data.get({ table: 'schoolyears', key })
  },
  schoolyears: async () => {
    return await data.get({ table: 'schoolyears' })
  },
  currentSchoolyear: async () => {
    const allSchoolyears = await data.get({ table: 'schoolyears' })
    return allSchoolyears.find(schoolyear => {
      const now = new Date().toJSON()
      return schoolyear.startDate < now && now < schoolyear.endDate
    })
  },
}
