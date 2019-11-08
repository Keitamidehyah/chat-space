json.(@message, :content, :image)
json.created_at @message.user_id
json.user_name   @message.user.name
json.image      @message.image.url

