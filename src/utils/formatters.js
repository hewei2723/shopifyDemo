export const money = (value) => `$${Math.round(value).toLocaleString('en-US')}`

export const percent = (value) => `${value > 0 ? '+' : ''}${value}%`

export const levelTone = (level) => ({
  高: 'danger',
  中: 'warning',
  低: 'info',
})[level] || 'info'

export const statusTone = (status) => {
  if (['在线', '已同步', '已支付', '已发货', '投放中', '完成', '正常'].includes(status)) {
    return 'success'
  }

  if (['库存风险', '待同步', '待发货', '补货中', '处理中', '执行中', '等待中', '待优化', '暂停建议', '退款中', '限流'].includes(status)) {
    return 'warning'
  }

  if (['广告异常', 'GA 异常', '离线', '待下架', '已下架', '失败', '已暂停', '支付失败', '异常'].includes(status)) {
    return 'danger'
  }

  return 'info'
}
