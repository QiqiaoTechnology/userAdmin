
function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
    return v[j]
  }))
}

export default function handleClipboard(tHeader, filterVal, tableList, filterName) {
    import('@/vendor/Export2Excel').then(excel => {
      const data = formatJson(filterVal, tableList)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: filterName
      })
    })
}
