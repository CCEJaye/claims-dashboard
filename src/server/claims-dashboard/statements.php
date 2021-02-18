<?php

function query_all($table)
{
   return "SELECT * FROM {$table}";
}

function getStatementOptions($method, $type)
{
   if ($method === "get")
      {
         switch ($type) {
            case "allClaims":
               return [
                  "sql" => query_all("claims"),
                  "params" => [],
                  "types" => []
               ];
            default:
               return;
      }
   }
   return;
}
?>