// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CrowdFunding 
{    
    address payable public benificiary;
    uint256 public goal;
    uint256 deadline;
    uint256 public raiseamount;
    mapping (address => uint256) public contribution;
    constructor (address payable _benificiary,uint256 _goal,uint256 _deadline)
    {
        benificiary = _benificiary;
        goal  = _goal;
        deadline = block.timestamp + _deadline *1 days;
    }
        function contribute()public payable {
       //require(block.timestamp <= deadline,"Campagign has already Ended");
       require(msg.value > 0, "Contribution must be Greater than 0");
       contribution[msg.sender] += msg.value;
       raiseamount += msg.value;
        }

        function withdraw() public {
            require(block.timestamp > deadline," Campagin has not ended");
            require(raiseamount >= goal,"Goal not reached");
            require(msg.sender == benificiary,"Only beneficiary can claim");
            payable(benificiary).transfer(raiseamount);
        }
}
