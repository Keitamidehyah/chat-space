json.array! @messages do |message|
  json.content mesage.content
  json.image message.image
  json.created_at message .user.name
  json.user_name message.user.name
  json.id message.id
end