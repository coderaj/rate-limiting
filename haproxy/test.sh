date
for ((i=1;i<=11;i++)); do  {
 echo "____________________________________________________________________";
 echo "$i";
 curl -v -H "Client_id: abc-123" "localhost"; 
}
done
