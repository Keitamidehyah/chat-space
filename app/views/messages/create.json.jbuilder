json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d/%A %H:%M")
json.user_name @message.user.name
json.id @message.id
json.image @message.image.url
