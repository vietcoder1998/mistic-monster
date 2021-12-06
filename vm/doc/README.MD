# MMC VM  

1. PROBLEM
- when compile program with mmc-compiler, the result will write into .metadata_json file
- Need to transform metadata and exec, the result will be write into a contract in handling with

2. SOLUTION
- create a virtual machine for read metadata
- input: 
    #### [name].metadata 
- output: 
    ### [result][json data]

3. PROCESSION
    1. read .metadata file, fetch data into VM
    2. generate .masm file
    3. the result is turn back with a transaction file using txs for action
    

4. MMC-CHAIN CORE ARCHITECTURE

    USER   
     ____________________________
    | MMC-VM [SOURCE]           |
    | MMC-API [SOURCE]          |
    |___________________________|
  

5. MMC-RPC CORE ARCHITECTURE
     __________________________________
    | MMC-COMPILER [SOURCE]            |
    | MMC-RPC-API  [SOURCE]            |
    | MMC-WEB3.JS  [MMC_API_INTERFACE] |
    |__________________________________|

    USER  => DEPLOY { MMC-RPC } => RESULT 
            _________________________________
           ( write contract in blockchain db )

6. MMC-CHAIN SOURCE 
    ## 1.MMC-CHAIN ( WRITE API, HANDLING )
    ## 2.MMC-VM ( READ METADATA AND DEPLOY CONTRACT WIH MMC-CHAIN API )
    ## 3.MMC-RPC ( SETUP RPC FOR API CODE )
    ## 4.MMC-COMPILER ( WRITE FOR CONTRACT WRITING API WITH MMC LANGUAGE )
    ## 5.MMC-WEB3.JS ( QUICK API FOR MMC-CHAIN )
    ## 6.MMC-WALLET ( WALLET FOR MMC-CHAIN )

