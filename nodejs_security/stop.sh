#! /home/paulo/bootcamp2019/gobarber
# ========================
# Script: stop.sh
# ========================
clear
echo ""
echo ">>>>>>>>>> Listando processos do docker <<<<<<<<<<"
echo ""
docker ps
echo ""
echo "Parando processos do docker"
echo ""
docker stop database
echo ""
docker stop mongobarber
echo ""
docker stop redisbarber
echo ""
docker ps
echo ">>>>>>>>>> TODOS OS PROCESSOS FORAM FINALIZADOS <<<<<<<<<<"


