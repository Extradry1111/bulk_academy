/**
 * BULK Academy Script - Advanced Decentralized Trading Education
 * Features: Interactive lessons, quizzes with shuffled answers, perpetual simulator, and progress tracking
 */

const LESSONS = [
    { id: 1, title: "Introduction to BULK Exchange: Decentralized High-Frequency Trading" },
    { id: 2, title: "Understanding Perpetual Futures and Leverage" },
    { id: 3, title: "Risk Management: Margins, Liquidations, and Position Sizing" },
    { id: 4, title: "Order Types, Trading Strategies, and Execution" },
    { id: 5, title: "BULK Architecture: How Decentralization Meets Performance" },
    { id: 6, title: "Advanced Features: Mark Price, Funding Rates, and Smart Risk" }
];

const LESSON_CONTENT = {
    1: `<h4>What is BULK Exchange?</h4><p>BULK Exchange is a next-generation decentralized trading platform engineered to close the performance gap between centralized and decentralized exchanges. Built on Solana, BULK delivers institutional-grade execution with colocation-level latency (5-20ms) while maintaining complete decentralization, censorship resistance, and permissionless access.</p><h4>The Performance Problem</h4><p>Traditional decentralized exchanges suffer from fundamental performance limitations. Ethereum-based DEXs face gas costs and block time constraints. Layer 2 solutions introduce centralized sequencers. Bridge-based cross-chain systems add security vulnerabilities. Meanwhile, centralized exchanges dominate with microsecond execution, unfair MEV extraction, and single points of failure. Traders must choose between speed and security.</p><p>BULK eliminates this false choice by separating time-sensitive order matching from less-critical settlement, achieving true institutional performance without compromising decentralization.</p><h4>Core Philosophy: "Execution Worth Quoting Into"</h4><p>BULK is built on uncompromising design principles:</p><ul><li><strong>Deterministic FIFO Matching:</strong> Orders processed fairly by time priority only, zero front-running risk</li><li><strong>Leaderless Decentralization:</strong> No single sequencer, no leader-based block production, no censorship vectors</li><li><strong>Cryptographic Verifiability:</strong> All state changes provably valid through BLS threshold signatures</li><li><strong>Permissionless Validation:</strong> Anyone can run a validator and earn from orderflow—completely open</li><li><strong>No Bridges or Sequencers:</strong> Eliminates entire categories of security vulnerabilities</li></ul><h4>BULK's Mission</h4><p>BULK aims to prove that traders no longer have to sacrifice security for speed. By leveraging Solana's robust consensus for settlement while running a high-performance execution layer on top, BULK creates an institutional-grade platform for the future of finance. It's Execution Worth Quoting Into—delivered at scale.</p><h4>What Makes BULK Different?</h4><p><strong>Performance:</strong> 5-20ms matching plus propagation, compared to seconds on traditional DEXs. Market makers can react to price movements in real-time.</p><p><strong>Decentralization:</strong> No sequencer dependency. The order book runs deterministically on every validator node using cryptographic sorting.</p><p><strong>Security:</strong> Every trade backed by Solana's cryptographic finality. Economic irreversibility achieved in 25-40ms.</p><p><strong>Capital Efficiency:</strong> Cross-margin support allows traders to use one collateral pool across all positions.</p><h4>The Trading Experience</h4><p>Traders deposit USD onto BULK and trade perpetual futures on major assets (BTC, ETH, SOL) with up to 20x leverage. Orders are submitted via web interface, API, or CCXT integration. The system handles all complexity: margin calculations, liquidations, funding rates, and fair price calculations. Users experience the speed of a centralized exchange with the security and censorship resistance of blockchain.</p><h4>Why Solana?</h4><p>BULK uses Solana as its settlement layer because Solana excels at what it was designed for: secure, decentralized custody and finality. By layering BULK's high-performance execution on top of Solana's proven consensus, we get the best of both worlds: institutional execution speed with enterprise-grade security.</p>`,
    2: `<h4>What Are Perpetual Futures?</h4><p>Perpetual futures (or "perps") are derivatives that allow traders to take leveraged long or short positions on assets without owning them. Unlike traditional futures with expiration dates, perpetuals trade indefinitely as long as a position remains open.</p><h4>Long vs Short Positions</h4><p><strong>Long Position:</strong> You profit if the asset price rises and lose if it falls. You're betting on the bull case.</p><p><strong>Short Position:</strong> You profit if the asset price falls and lose if it rises. You're betting on the bear case.</p><h4>Understanding Leverage</h4><p>Leverage amplifies both gains and losses. On BULK, you can use up to 20x leverage on BTC/USD, ETH/USD, and SOL/USD perpetuals.</p><p><strong>Example:</strong> If you deposit \$1,000 USDC and open a 10x leveraged long position on BTC at \$50,000: Your position size is \$10,000 notional (you control 0.2 BTC worth). Initial Margin required is \$1,000. If BTC rises to \$51,000, your position profit is \$200 (2% price move = 20% return).</p><h4>Entry and Exit</h4><p><strong>Opening:</strong> Submit a buy limit/market order (for long) or sell limit/market order (for short). The system instantly calculates if you have sufficient margin.</p><p><strong>Closing:</strong> Submit an opposite order to realize your profit or loss.</p><h4>Price Changes and Profit/Loss</h4><p>Your unrealized PnL is calculated continuously using the Mark Price (not the last trade price).</p><p><strong>Formula:</strong> Unrealized PnL = (Mark Price - Entry Price) × Position Size</p><h4>Funding Rates</h4><p>Perpetuals have a unique mechanism: funding rates. These are periodic payments (typically 8-hourly) between traders on opposite sides of the market, designed to keep the perpetual price anchored to the spot market.</p><h4>Liquidations: The Risk Scenario</h4><p>If your position's unrealized loss grows large enough that your account falls below the Maintenance Margin threshold, your position is liquidated. All your open orders are immediately canceled, and your position is closed via market order.</p><h4>Why Perpetual Futures?</h4><p>Perps enable traders to express market views without owning the underlying. They also allow efficient volatility trading, hedging existing spot holdings, and capital-efficient speculation.</p>`,
    3: `<h4>Introduction to Margin on BULK</h4><p>Margin is the collateral you provide to open a leveraged position. BULK's margin system is designed to be both capital-efficient and protective.</p><h4>Initial Margin (IM): The Collateral Requirement</h4><p>Initial Margin is the minimum collateral required to open or increase a position.</p><p><strong>Formula:</strong> Initial Margin = (Position Size × Asset Price) / Leverage</p><p><strong>Example:</strong> To open a 10x leveraged long position on 0.1 BTC (notional \$5,000 at \$50,000 price): Initial Margin required = (\$5,000 / 10) = \$500 USDC</p><h4>Maintenance Margin (MM): The Liquidation Trigger</h4><p>Maintenance Margin is the minimum collateral level required to keep a position open. If your account equity falls below this threshold, liquidation is triggered.</p><h4>Cross Margin vs Isolated Margin</h4><p><strong>Cross Margin (Default):</strong> All your collateral is pooled across all cross-margin positions. Profitable positions help support losing ones.</p><p><strong>Isolated Margin:</strong> You allocate specific collateral to a position. Losses on that position cannot affect others.</p><h4>Leverage and Position Sizing Strategy</h4><p>Higher leverage = higher risk. Key relationships: 10x leverage = 10% price move liquidates you. 20x leverage = 5% price move liquidates you. 5x leverage = 20% price move liquidates you.</p><h4>The Liquidation Process</h4><p>When liquidation triggers: BULK's LiquidationEngine sends a CancelAllOrders command immediately. All pending orders are canceled. A reduce-only market order is submitted to close the position. The position is closed at the best available price.</p><h4>Practical Risk Management</h4><p><strong>Position Sizing Formula:</strong> Position Size = (Account Size × Risk %) / (Price Move % × Leverage)</p><p><strong>Example:</strong> You have \$10,000, willing to risk 2% per trade, using 10x leverage, expect 5% price move: Position Size = (\$10,000 × 0.02) / (0.05 × 10) = \$400 notional</p><h4>Key Takeaways</h4><ul><li>Always know your liquidation price before opening a position</li><li>Use Take Profit and Stop Loss orders to automate risk management</li><li>Conservative leverage (5-10x) with proper position sizing beats aggressive leverage</li><li>Monitor your margin levels constantly, especially in volatile markets</li></ul>`,
    4: `<h4>BULK Order Types Overview</h4><p>BULK supports multiple order types to accommodate different trading strategies and risk management approaches.</p><h4>Market Orders: Immediate Execution</h4><p>A market order buys or sells immediately at the best available current price. Market orders prioritize execution certainty over price control.</p><h4>Limit Orders: Price Control</h4><p>A limit order buys or sells at a specified price or better. Buy limits execute at your price or lower; sell limits execute at your price or higher.</p><h4>Order Time-in-Force Options</h4><p><strong>GTC (Good-Till-Canceled):</strong> Order remains active until you cancel it or it fills.</p><p><strong>IOC (Immediate-or-Cancel):</strong> Order fills immediately at available prices, or cancels.</p><h4>Reduce-Only Orders: Risk Management</h4><p>A reduce-only order can only decrease an existing position size; it cannot open a new position or increase size.</p><h4>Take Profit (TP) and Stop Loss (SL) Orders</h4><p>These are conditional orders that trigger automatically when price reaches a specific level. BULK uses the Mark Price (not last trade price) for TP/SL triggering. This prevents manipulation and ensures fair trigger points.</p><h4>Trading Strategy Examples</h4><p><strong>Strategy 1: Mean Reversion:</strong> Wait for price to spike above resistance. Place a sell limit order to short at the resistance level. Attach a TP limit order at lower support level.</p><p><strong>Strategy 2: Trend Following:</strong> Identify an uptrend on charts. Place a buy market order to enter the trend. Use a trailing TP to capture upside.</p><p><strong>Strategy 3: Grid Trading:</strong> Place multiple limit orders at different price levels. Let them fill as price oscillates. Systematically exit at higher levels for profit.</p><h4>Order Best Practices</h4><ul><li>Always use appropriate time-in-force</li><li>Use limit orders for better prices; market orders for certainty</li><li>Always attach TP/SL to manage risk, especially on leverage</li><li>Use reduce-only for exits to prevent accidental flips</li><li>Test strategies on BULK's alphanet before real capital</li></ul>`,
    5: `<h4>BULK Architecture: Separating Execution from Settlement</h4><p>BULK's genius is architectural simplicity with technical sophistication. The system separates time-sensitive order matching (execution) from less-time-critical settlement, enabling both institutional performance and genuine decentralization.</p><h4>Key Architectural Components</h4><p><strong>Bulk-agave:</strong> The core validator client, a fork of Jito-agave. This allows validators to run BULK's trading logic without forgoing Jito's MEV revenue.</p><p><strong>BULK Tile:</strong> The high-performance in-memory execution environment. This is where the real action happens: deterministic order matching, margin calculations, liquidations.</p><p><strong>BULK Net:</strong> The ultra-low-latency order propagation layer. Uses Reed-Solomon erasure coding and UDP fan-out to disseminate orders in under 20ms globally.</p><p><strong>BULK Db:</strong> Peer-replicated, fault-tolerant database storing the canonical log of all trades and state changes.</p><p><strong>Commit Path:</strong> The bridge between high-speed BULK and Solana. Batches state changes, collects BLS signatures from validators, and periodically commits aggregated proofs to Solana L1.</p><h4>Deterministic Matching: The Core Innovation</h4><p>Every 20ms, a "tick" occurs. During each tick, all validators independently execute identical matching logic. This is possible through deterministic ordering.</p><p><strong>Deterministic Sort Key:</strong> hash(pubkey | nonce | tick)</p><p>All orders within a tick are sorted using this cryptographic key. Because the hash is deterministic, every honest validator produces identical ordering and matching results.</p><h4>Consensus: BLS Threshold Signatures</h4><p>After matching, validators must agree on the results. BULK uses BLS threshold signatures where ≥80% of stake-weighted validators must sign off to finalize.</p><h4>Two Types of Finality</h4><p><strong>Economic finality (25-40ms):</strong> Once supermajority of Solana stake signs off on a tick, it's economically irreversible.</p><p><strong>Settlement finality (seconds-to-minutes):</strong> The state delta is periodically batched and written to Solana L1.</p>`,
    6: `<h4>The Mark Price: Core to Fair Risk Management</h4><p>The Mark Price is BULK Exchange's most critical price index. Unlike last-traded-price, which can be volatile and manipulable, the Mark Price uses a robust 3-component median algorithm designed for fairness and stability.</p><h4>Mark Price Components</h4><p><strong>Component 1: Adjusted Oracle Price</strong> - External oracle from Pyth (links to global spot markets), adjusted with 150-second EMA.</p><p><strong>Component 2: Local Order Book Median</strong> - Median of best bid, best ask, and last traded price.</p><p><strong>Component 3: Smoothed Local Price</strong> - 30-second EMA of Local Order Book Median.</p><h4>Final Calculation: Median of Medians</h4><p>The MarkPriceCalculator computes all three components, sorts them, and selects the middle value.</p><p><strong>Example:</strong> Component 1: \$45,230, Component 2: \$45,225, Component 3: \$45,235. Sorted: \$45,225, \$45,230, \$45,235. Mark Price = Median = \$45,230</p><h4>Why This Design?</h4><p>To manipulate the Mark Price, you'd need to move two of the three components simultaneously. This requires both pushing the local orderbook (expensive) AND moving the oracle price (impossible without real spot market flow).</p><h4>Applications of Mark Price</h4><p><strong>Margin & Liquidation Calculations:</strong> All margin requirements and liquidation triggers use Mark Price, not last trade.</p><p><strong>Unrealized PnL:</strong> Your profit/loss is calculated against Mark Price.</p><p><strong>Take Profit & Stop Loss:</strong> TP/SL orders trigger on Mark Price, not last trade.</p><h4>Funding Rates: Keeping Perpetuals Anchored</h4><p>Perpetuals can trade at a premium or discount to spot. Funding rates are periodic payments between long and short traders designed to keep the perpetual price close to spot.</p><p><strong>Funding Formula:</strong> Funding Rate = (Mark Price - Oracle Price) / Oracle Price</p>`
};

const QUIZZES = {
    1: [
        { q: "What is BULK Exchange's primary competitive advantage?", options: ["Lowest fees", "5-20ms latency with full decentralization", "Most coins listed", "Easiest UI"], answer: 1, hint: "Review the performance gap solution section" },
        { q: "Which layer does BULK use for final settlement?", options: ["Ethereum", "Solana", "Arbitrum", "Polygon"], answer: 1, hint: "Check 'Why Solana?' section" },
        { q: "What prevents front-running on BULK?", options: ["Encrypted mempools", "Deterministic FIFO sorting via cryptographic hash", "Validator consensus", "Sequencer ordering"], answer: 1, hint: "Study the 'Execution Worth Quoting Into' philosophy" },
        { q: "Can any trader become a BULK validator?", options: ["No, only institutions", "No, validators are fixed", "Yes, it's permissionless", "Only Solana validators"], answer: 2, hint: "Look at the decentralization principles" },
        { q: "What is the latency target for BULK?", options: ["100-500ms", "1-5ms", "5-20ms", "500ms-1s"], answer: 2, hint: "Check the core architectural goals" }
    ],
    2: [
        { q: "What does leverage mean?", options: ["Your total trading experience", "How much more capital you control relative to your deposit", "Your account's profit margin", "Number of positions open"], answer: 1, hint: "Review the leverage explanation section" },
        { q: "What is a short position?", options: ["A small trade", "Betting that price will fall", "Selling before buying", "A stop loss order"], answer: 1, hint: "Check 'Long vs Short' section" },
        { q: "If you open a 10x long and the price rises 2%, your profit is approximately:", options: ["2%", "5%", "10%", "20%"], answer: 3, hint: "Study the leverage example" },
        { q: "Why is leverage risky?", options: ["It increases fees", "It amplifies both gains AND losses", "It requires KYC", "Only certain brokers allow it"], answer: 1, hint: "Review the leverage risks section" },
        { q: "When do liquidations occur?", options: ["When you close a position", "When price moves 100%", "When equity < Maintenance Margin", "Only on centralized exchanges"], answer: 2, hint: "Study the liquidation triggers" }
    ],
    3: [
        { q: "What is Initial Margin?", options: ["Total account balance", "The minimum collateral to open a position", "Trading fees", "Unrealized profit"], answer: 1, hint: "Review Initial Margin (IM) section" },
        { q: "If you need to open a 10x leveraged position worth \$10,000, how much Initial Margin is required?", options: ["\$100", "\$500", "\$1,000", "\$10,000"], answer: 2, hint: "Study the formula: Position Size / Leverage" },
        { q: "What is the key difference between Cross and Isolated margin?", options: ["Isolated is faster", "Cross uses all collateral; Isolated allocates specific amounts per position", "They are identical", "Cross is only for shorts"], answer: 1, hint: "Check 'Cross Margin vs Isolated Margin'" },
        { q: "What happens immediately when your account is liquidated?", options: ["A penalty fee is charged", "All open orders are canceled", "You lose access to the platform", "A margin call alert is sent"], answer: 1, hint: "Review the liquidation process" },
        { q: "A trader wants 5% risk per trade, has \$10,000, uses 10x leverage, expects 5% price move. Rough position size:", options: ["\$400", "\$500", "\$1,000", "\$2,000"], answer: 0, hint: "Study the position sizing formula" }
    ],
    4: [
        { q: "What is a limit order?", options: ["An order limited to one exchange", "Buy/sell at a specific price or better", "An order that limits losses", "A temporary order"], answer: 1, hint: "Review the Limit Order section" },
        { q: "When should you use a market order?", options: ["Always, for best execution", "When you want price certainty", "When you need immediate execution", "Never, limit orders are always better"], answer: 2, hint: "Check market order use cases" },
        { q: "What is a reduce-only order?", options: ["An order that reduces fees", "An order that can only decrease position size", "A low-risk order type", "Only available on margin"], answer: 1, hint: "Study the reduce-only section" },
        { q: "What price triggers Take Profit/Stop Loss orders on BULK?", options: ["Last traded price", "Average price", "Mark Price", "Oracle price"], answer: 2, hint: "Review TP/SL triggering mechanics" },
        { q: "What is an OCO order?", options: ["A type of market order", "One-Cancels-Other: TP/SL linked to parent order", "An order that executes once daily", "Only for advanced traders"], answer: 1, hint: "Check the OCO section" }
    ],
    5: [
        { q: "What is BULK Tile?", options: ["A settlement layer", "In-memory matching engine running on validators", "A graphical interface", "Solana component"], answer: 1, hint: "Review BULK architecture components" },
        { q: "How does BULK Net achieve sub-20ms propagation?", options: ["Faster internet", "Reed-Solomon erasure coding + UDP fan-out", "Larger block size", "Fewer validators"], answer: 1, hint: "Study order propagation section" },
        { q: "What prevents validator misbehavior in matching?", options: ["Trust", "Slashing", "Deterministic cryptographic sorting", "IP reputation"], answer: 2, hint: "Review deterministic matching section" },
        { q: "What is economic finality on BULK?", options: ["When your position closes", "When BLS quorum signs a tick (25-40ms)", "When Solana finalizes the block", "When you withdraw funds"], answer: 1, hint: "Check finality types section" },
        { q: "Why fork Jito-agave specifically?", options: ["Cheaper to code", "Allows validators to earn MEV while running BULK", "Better performance", "No specific reason"], answer: 1, hint: "Review Bulk-agave explanation" }
    ],
    6: [
        { q: "What is the Mark Price?", options: ["Last traded price", "Median of 3 components: Adjusted Oracle, Local Median, Smoothed Local", "Oracle price only", "Average of all trades"], answer: 1, hint: "Review mark price components section" },
        { q: "Why is Mark Price resistant to manipulation?", options: ["It's encrypted", "Must move two of three components simultaneously", "Validators validate it", "It can't be"], answer: 1, hint: "Study 'Why This Design?' section" },
        { q: "What is a funding rate?", options: ["Exchange trading fees", "Periodic payment between longs/shorts to anchor perpetual to spot", "Interest on margin", "Liquidation fee"], answer: 1, hint: "Review funding rates section" },
        { q: "If Mark Price is \$100 and Entry Price was \$95, a 1 BTC long position has unrealized PnL of:", options: ["\$5", "\$95", "\$100", "\$1"], answer: 0, hint: "Study the PnL formula" },
        { q: "What margin percent should professional traders maintain above maintenance?", options: ["10%", "25%", "50%", "80%+"], answer: 3, hint: "Check professional practices section" }
    ]
};

const FLASHCARDS = [
    { term: "Perpetual Futures (Perps)", definition: "Leveraged derivatives that allow traders to take long or short positions on assets without expiration, traded indefinitely with periodic funding rate settlements." },
    { term: "Leverage", definition: "A multiplier that allows traders to control more capital than they deposit. 10x leverage means controlling 10x your deposit. Amplifies both gains and losses." },
    { term: "Initial Margin (IM)", definition: "The minimum collateral required to open or increase a position. Calculated as (Position Size × Price) / Leverage. Pre-flight checked before order acceptance." },
    { term: "Maintenance Margin (MM)", definition: "The minimum collateral level required to keep a position open. Liquidation triggers when account equity falls below MM threshold." },
    { term: "Liquidation", definition: "Forced closure of a position when equity falls below maintenance margin. All open orders canceled, position closed via market order, collateral seized." },
    { term: "Mark Price", definition: "BULK's robust price index: median of (1) Adjusted Oracle Price, (2) Local Order Book Median, (3) Smoothed Local Price. Used for margin and liquidation calculations." },
    { term: "Cross Margin", definition: "Margin mode where all collateral is pooled across positions. Profitable positions support losing ones. Most capital-efficient but riskier." },
    { term: "Isolated Margin", definition: "Margin mode where specific collateral is allocated per position. Losses don't affect other positions. Safer for risky trades but requires more capital." },
    { term: "Funding Rate", definition: "Periodic payment (typically 8-hourly) between long and short traders to keep perpetual price anchored to spot market. Incentivizes position rebalancing." },
    { term: "Unrealized PnL", definition: "Current profit/loss on an open position calculated as (Mark Price - Entry Price) × Position Size. Not locked in until position closes." },
    { term: "Entry Price", definition: "Volume-weighted average price at which a position was opened. Automatically updated by BULK's ClearingHouse on each trade execution." },
    { term: "Reduce-Only Order", definition: "Order type that can only decrease existing position size, never increase it or open new positions. Used for safe position exits and stop losses." },
    { term: "Take Profit (TP)", definition: "Conditional order that automatically closes a position to lock in profits when Mark Price reaches specified trigger level." },
    { term: "Stop Loss (SL)", definition: "Conditional order that automatically closes a position to limit losses when Mark Price reaches specified trigger level." },
    { term: "Deterministic Matching", definition: "BULK's core innovation: orders within each 20ms tick are sorted via cryptographic hash, ensuring all validators produce identical matching results with no front-running." },
    { term: "BLS Threshold Signature", definition: "Consensus mechanism where state delta must be signed by ≥80% of stake-weighted validators to finalize, enabling leaderless agreement." },
    { term: "Economic Finality", definition: "When BLS quorum signs a tick (~25-40ms), it's economically irreversible. Cheaper than full on-chain finality but provides strong practical guarantees." },
    { term: "BULK Net", definition: "Ultra-low-latency order propagation layer using Reed-Solomon erasure coding and UDP fan-out to disseminate orders globally in sub-20ms." },
    { term: "BULK Tile", definition: "In-memory execution environment on every BULK validator running the deterministic matching engine, margin calculations, and liquidation logic." },
    { term: "Slippage", definition: "Difference between expected execution price and actual price, typically due to market volatility or illiquidity. Market orders suffer more slippage than limits." }
];

const LIBRARY_ENTRIES = [
    { title: "High-Frequency Trading on Decentralized Exchanges", content: "BULK enables true high-frequency trading on a decentralized system with 5-20ms latencies. Traditional DEXs operate at seconds; traditional centralized exchanges at microseconds. BULK bridges this gap through its novel architecture separating execution from settlement, allowing order matching in memory on validator nodes rather than on-chain." },
    { title: "Order Propagation: BULK Net Protocol", content: "BULK Net uses Reed-Solomon erasure coding to encode order batches into 8 shards (6 data, 2 parity). Any 6 shards reconstruct the original data, surviving significant packet loss. Two-hop UDP fan-out with immediate relay achieves sub-20ms global propagation without cumulative latency at each network hop." },
    { title: "Deterministic FIFO Matching Engine", content: "Every 20ms tick, all orders are sorted using cryptographic hash: hash(pubkey | nonce | tick). This sorting is deterministic—every honest validator produces identical results. Completely eliminates front-running risk, validator misbehavior, and centralized sequencer dependencies." },
    { title: "Leaderless Consensus with BLS", content: "State deltas must be signed by ≥80% of stake-weighted validators using BLS threshold signatures. No single validator or sequencer can enforce incorrect state. System remains safe and live even with 20% malicious stake and 20% offline stake simultaneously." },
    { title: "Two Types of Finality", content: "Economic finality arrives in 25-40ms when BLS quorum signs a tick—enough for market makers to update quotes. Settlement finality follows on Solana L1 (seconds to minutes) for cryptographic anchoring. This separation enables high-frequency trading while maintaining security." },
    { title: "Mark Price Algorithm: Manipulation Resistance", content: "Mark Price is median of: (1) Adjusted Oracle (anchors to spot), (2) Local OB Median (reflects BULK price), (3) Smoothed Local (dampens noise). To manipulate, attacker must move 2 of 3 simultaneously—expensive and often impossible without moving actual spot market." },
    { title: "Funding Rates and Perpetual Anchoring", content: "Perpetuals trade at premium/discount to spot. Funding rate = (Mark Price - Oracle Price) / Oracle Price, paid every 8 hours. Incentivizes convergence: when perpetual trading high, longs pay shorts, encouraging short opening to push price down." },
    { title: "Liquidation Engine: Protecting System Solvency", content: "When account equity < Maintenance Margin, LiquidationEngine immediately cancels all open orders, then submits reduce-only market orders to close position systematically. Prevents cascading liquidations and maintains orderbook stability during stress." },
    { title: "Margin Tiers and Position Risk Management", content: "BULK uses position-size-based tiers: larger positions require higher maintenance margin percentages. Reflects systemic risk—a $1M position carries more risk than a $10K position. Incentivizes sensible position sizing over dangerous leverage." },
    { title: "Cross-Margin Capital Efficiency", content: "In cross-margin mode, all collateral pools across positions. Profitable positions support losing ones. Available equity = total collateral + sum(unrealized PnL). Enables sophisticated hedging and capital-efficient strategies impossible in isolated-only systems." },
    { title: "Take Profit and Stop Loss Best Practices", content: "Always attach TP/SL to positions on leverage. Use TP/SL limit orders for better prices; use TP/SL market orders for certainty. TP/SL trigger on Mark Price (not last trade) to prevent manipulation. Consider attaching to entry orders via OCO for automated execution." },
    { title: "Position Sizing and Risk Management Formula", content: "Professional formula: Position Size = (Account Size × Risk %) / (Expected Price Move % × Leverage). Example: $10k account, 2% risk, 10x leverage, 5% expected move = \$400 position size. Ensures consistent risk-reward and prevents overleveraging." },
    { title: "Validator Economics and Incentives", content: "Validators earn: (1) Block rewards in BULK tokens, (2) MEV from Jito's orderflow, (3) BULK orderflow fees. Profitability depends on stake size, latency, and uptime. Running a validator requires significant technical infrastructure but can be highly profitable on active exchanges." },
    { title: "Solana Settlement and Asset Custody", content: "BULK uses Solana for what it does best: secure, decentralized asset custody and final settlement. State deltas periodically committed to Solana L1 provide cryptographic finality. No bridges, wrapped tokens, or third-party custody—true self-custody." },
    { title: "API Integration and Trading Automation", content: "BULK supports REST API and WebSocket connections for programmatic trading. Compatible with CCXT for standardized crypto exchange interfaces. Gasless order submission means traders don't pay per-order fees. Perfect for algorithmic trading and market making." }
];

let userProgress = initializeProgress();
let currentQuizState = null;
let perpSimulatorState = null;
let priceHistory = [];
let animationFrameId = null;
let chart = null;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    updateStreak();
    renderLessonsList();
    renderFlashcards();
    renderLibrary();
    updateGlobalProgress();
    showSection('home');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(e.target.getAttribute('data-section'));
        });
    });
});

function initializeProgress() {
    const defaultState = { streak: 0, lastLogin: null, lessons: {} };
    LESSONS.forEach(lesson => {
        defaultState.lessons[lesson.id] = { completed: false, quizPassed: false, readProgress: 0 };
    });

    const saved = localStorage.getItem('bulkProgress');
    if (!saved) return defaultState;

    const parsed = JSON.parse(saved);
    LESSONS.forEach(lesson => {
        if (!parsed.lessons[lesson.id]) {
            parsed.lessons[lesson.id] = { completed: false, quizPassed: false, readProgress: 0 };
        }
    });
    return parsed;
}

function saveProgress() {
    localStorage.setItem('bulkProgress', JSON.stringify(userProgress));
    updateGlobalProgress();
}

// NAVIGATION
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) target.classList.remove('hidden');

    const navItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (navItem) navItem.classList.add('active');

    if (sectionId === 'certificate') {
        checkCertificateEligibility();
    }
}

// PROGRESS & STREAK
function updateGlobalProgress() {
    const total = LESSONS.length;
    const passed = LESSONS.filter(lesson => userProgress.lessons[lesson.id]?.quizPassed).length;
    const percent = total ? Math.round((passed / total) * 100) : 0;

    const bar = document.getElementById('overall-progress-bar');
    const label = document.getElementById('progress-percent');
    if (bar) bar.style.width = `${percent}%`;
    if (label) label.textContent = `${percent}% Completed (${passed}/${total} Lessons Passed)`;

    renderLessonsList();
}

function updateStreak() {
    const today = new Date().toDateString();
    const last = userProgress.lastLogin;
    let streak = userProgress.streak || 0;

    if (last !== today) {
        if (last) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            streak = (last === yesterday.toDateString()) ? streak + 1 : 1;
        } else {
            streak = 1;
        }
        userProgress.streak = streak;
        userProgress.lastLogin = today;
    }

    const streakEl = document.getElementById('current-streak');
    const streakElHeader = document.getElementById('current-streak-header');
    if (streakEl) streakEl.textContent = `${userProgress.streak} Days`;
    if (streakElHeader) streakElHeader.textContent = `${userProgress.streak} Days`;

    saveProgress();
}

// LESSONS
function renderLessonsList() {
    const container = document.getElementById('lessons-list');
    if (!container) return;
    container.innerHTML = '';

    LESSONS.forEach((lesson, index) => {
        const status = userProgress.lessons[lesson.id];
        const isCompleted = !!status.quizPassed;
        const isLocked = index > 0 && !userProgress.lessons[lesson.id - 1].quizPassed;

        const card = document.createElement('div');
        card.className = `lesson-card section-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;

        let statusText = 'Start Lesson';
        let icon = '<i class="fas fa-play"></i>';
        if (isLocked) {
            statusText = 'Locked';
            icon = '<i class="fas fa-lock"></i>';
        } else if (isCompleted) {
            statusText = 'Quiz Passed';
            icon = '<i class="fas fa-check-circle"></i>';
        }

        card.innerHTML = `
            <p>Lesson ${lesson.id}</p>
            <h3>${lesson.title}</h3>
            <div class="lesson-status">
                <span>${statusText}</span>
                ${icon}
            </div>
        `;

        if (!isLocked) {
            card.addEventListener('click', () => openLesson(lesson.id));
        }

        container.appendChild(card);
    });
}

function openLesson(id) {
    showSection('lesson-viewer');

    document.getElementById('lesson-title').textContent = LESSONS[id - 1].title;
    document.getElementById('lesson-content-display').innerHTML = LESSON_CONTENT[id];

    const quizArea = document.getElementById('quiz-area');
    const lessonNavFooter = document.getElementById('lesson-navigation-footer');
    const nextLessonBtn = document.getElementById('next-lesson-btn');

    if (userProgress.lessons[id].quizPassed) {
        quizArea.classList.add('hidden');
        lessonNavFooter.classList.remove('hidden');
        
        const nextLessonId = id + 1;
        if (nextLessonId <= LESSONS.length) {
            nextLessonBtn.onclick = () => openLesson(nextLessonId);
            nextLessonBtn.textContent = `Go to Lesson ${nextLessonId}: ${LESSONS[nextLessonId-1].title} `;
            const arrowIcon = document.createElement('i');
            arrowIcon.className = 'fas fa-arrow-right';
            nextLessonBtn.appendChild(arrowIcon);
        } else {
            nextLessonBtn.textContent = 'View Certificate ';
            const trophyIcon = document.createElement('i');
            trophyIcon.className = 'fas fa-trophy';
            nextLessonBtn.appendChild(trophyIcon);
            nextLessonBtn.onclick = () => showSection('certificate');
        }
    } else {
        quizArea.classList.remove('hidden');
        lessonNavFooter.classList.add('hidden');
        startStepByStepQuiz(id);
    }

    const wrapper = document.querySelector('.lesson-content-wrapper');
    wrapper.scrollTop = 0;
    wrapper.onscroll = () => updateReadProgress(id, wrapper);
    updateReadProgress(id, wrapper, true);
}

function updateReadProgress(lessonId, container, init = false) {
    const scrollable = container.scrollHeight - container.clientHeight;
    const scrolled = container.scrollTop;
    let progress = 0;

    if (scrollable > 0) {
        progress = Math.min(100, Math.round((scrolled / scrollable) * 100));
    }

    if (init) {
        progress = userProgress.lessons[lessonId].readProgress || 0;
    } else {
        userProgress.lessons[lessonId].readProgress = progress;
        saveProgress();
    }

    document.getElementById('lesson-read-progress').style.width = `${progress}%`;
    document.getElementById('read-progress-percent').textContent = `${progress}%`;
}

// ===== ANSWER SHUFFLING FUNCTIONS =====
function shuffleAnswers(options, correctAnswerIndex) {
    const indexed = options.map((opt, idx) => ({ opt, idx }));
    
    for (let i = indexed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    
    const correctIndex = indexed.findIndex(item => item.idx === correctAnswerIndex);
    
    return {
        options: indexed.map(item => item.opt),
        correctIndex: correctIndex
    };
}

function shuffleAnswersForReview(options, correctAnswerIndex) {
    const indexed = options.map((opt, idx) => ({ opt, idx }));
    
    for (let i = indexed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    
    return indexed.map(item => item.opt);
}

// STEP-BY-STEP QUIZ WITH SHUFFLED ANSWERS
function startStepByStepQuiz(lessonId) {
    currentQuizState = {
        lessonId: lessonId,
        questions: QUIZZES[lessonId],
        currentIndex: 0,
        userAnswers: new Array(QUIZZES[lessonId].length).fill(null),
        started: false
    };

    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-question-display').innerHTML = '';
    document.getElementById('quiz-navigation').classList.remove('hidden');
    document.getElementById('quiz-next-btn').onclick = handleQuizNext;
    document.getElementById('quiz-next-btn').textContent = "Next Question";
    
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const state = currentQuizState;
    const q = state.questions[state.currentIndex];
    
    document.getElementById('quiz-step-indicator').textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;
    
    // SHUFFLE ANSWERS HERE
    const shuffledOptions = shuffleAnswers(q.options, q.answer);
    
    const container = document.getElementById('quiz-question-display');
    container.innerHTML = `
        <div class="quiz-question-single">
            <h4>${q.q}</h4>
            ${shuffledOptions.options.map((opt, idx) => `
                <div class="quiz-option" data-option="${idx}">
                    <input type="radio" name="current-question" value="${idx}" id="opt-${idx}">
                    <label for="opt-${idx}">${opt}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    if (state.userAnswers[state.currentIndex] !== null && typeof state.userAnswers[state.currentIndex] === 'object') {
        const prevSelected = container.querySelector(`.quiz-option[data-option="${state.userAnswers[state.currentIndex].shuffledIndex}"]`);
        if (prevSelected) {
            prevSelected.classList.add('selected');
            prevSelected.querySelector('input').checked = true;
        }
    }

    container.querySelectorAll('.quiz-option').forEach(opt => {
        opt.onclick = () => {
            container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
            state.userAnswers[state.currentIndex] = {
                shuffledIndex: parseInt(opt.dataset.option),
                correctIndex: shuffledOptions.correctIndex,
                original: q.answer
            };
        };
    });
}

function handleQuizNext() {
    const state = currentQuizState;
    const selectedValue = state.userAnswers[state.currentIndex];
    
    if (selectedValue === null || selectedValue === undefined) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        renderQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const state = currentQuizState;
    let correct = 0;
    
    const reviewHTML = state.questions.map((q, idx) => {
        const userAns = state.userAnswers[idx];
        
        let isCorrect;
        let userAnswerText;
        
        if (typeof userAns === 'object' && userAns !== null && userAns.shuffledIndex !== undefined) {
            isCorrect = userAns.shuffledIndex === userAns.correctIndex;
            userAnswerText = q.options[q.answer];
        } else if (typeof userAns === 'number') {
            isCorrect = userAns === q.answer;
            userAnswerText = q.options[userAns];
        } else {
            isCorrect = false;
            userAnswerText = 'Not answered';
        }
        
        if (isCorrect) correct++;
        
        const correctAnswerText = q.options[q.answer];

        return `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>Q${idx + 1}:</strong> ${q.q}<br>
                <strong>Your answer:</strong> ${userAnswerText || 'Not answered'}<br>
                ${!isCorrect ? `<strong>Correct answer:</strong> ${correctAnswerText}<br>` : ''}
                ${!isCorrect ? `<em>Hint:</em> ${q.hint}` : ''}
            </div>
        `;
    }).join('');
    
    const passed = correct >= 4;
    
    document.getElementById('quiz-question-display').innerHTML = '';
    document.getElementById('quiz-navigation').classList.add('hidden');
    
    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.classList.remove('hidden');
    
    document.getElementById('quiz-score').innerHTML = `
        <strong class="${passed ? 'result-message success' : 'result-message fail'}">
            You scored ${correct} out of ${state.questions.length}. ${passed ? '✅ You passed!' : '❌ You need 4 correct to pass.'}
        </strong>
    `;
    
    document.getElementById('quiz-review').innerHTML = reviewHTML;
    document.getElementById('quiz-hints').innerHTML = '';

    if (!passed) {
        document.getElementById('quiz-hints').innerHTML = `
            <h4><i class="fas fa-lightbulb"></i> Study Tips:</h4>
            <p>Review the lesson material carefully, especially sections mentioned in the hints above. Focus on mastering BULK's core concepts before retrying.</p>
        `;
        document.getElementById('retry-quiz-btn').classList.remove('hidden');
        document.getElementById('retry-quiz-btn').onclick = () => startStepByStepQuiz(state.lessonId);
        document.getElementById('finish-quiz-btn').classList.add('hidden');
    } else {
        userProgress.lessons[state.lessonId].quizPassed = true;
        userProgress.lessons[state.lessonId].completed = true;
        saveProgress();
        showLessonCompletedNotification(state.lessonId);
        
        document.getElementById('finish-quiz-btn').classList.remove('hidden');
        document.getElementById('finish-quiz-btn').onclick = () => showSection('lessons');
        document.getElementById('retry-quiz-btn').classList.add('hidden');
    }
}

function showLessonCompletedNotification(lessonId) {
    const notification = document.getElementById('lesson-completed-notification');
    const message = document.getElementById('completed-message');
    message.textContent = `Lesson ${lessonId} Completed! 🚀`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

// FLASHCARDS
function renderFlashcards() {
    const grid = document.getElementById('flashcard-grid');
    if (!grid) return;
    grid.innerHTML = '';

    FLASHCARDS.forEach(cardInfo => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flashcard-wrapper';

        const card = document.createElement('div');
        card.className = 'flashcard';
        card.innerHTML = `
            <div class="flashcard-front section-card">${cardInfo.term}</div>
            <div class="flashcard-back section-card">
                <p><strong>${cardInfo.term}</strong></p>
                <p>${cardInfo.definition}</p>
            </div>
        `;
        card.addEventListener('click', () => card.classList.toggle('flipped'));

        wrapper.appendChild(card);
        grid.appendChild(wrapper);
    });
}

// LIBRARY
function renderLibrary() {
    const container = document.getElementById('library-content');
    if (!container) return;
    container.innerHTML = '';

    LIBRARY_ENTRIES.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'library-item section-card';
        item.innerHTML = `
            <h3>${entry.title}</h3>
            <p>${entry.content}</p>
        `;
        container.appendChild(item);
    });
}

// CERTIFICATE
function checkCertificateEligibility() {
    const total = LESSONS.length;
    const completed = LESSONS.filter(lesson => userProgress.lessons[lesson.id]?.quizPassed).length;

    const message = document.getElementById('certificate-message');
    const img = document.getElementById('certificate-display');
    const button = document.getElementById('download-certificate');

    if (completed === total) {
        message.textContent = "🎉 Congratulations! You have completed BULK Academy and earned your Trading Certification!";
        img.classList.remove('hidden');
        button.classList.remove('hidden');
        button.onclick = () => alert("Certificate ready! You're now certified in decentralized high-frequency trading. Visit bulk.trade to start trading.");
        triggerConfetti();
    } else {
        message.textContent = `Complete ${total - completed} more lesson${total - completed !== 1 ? 's' : ''} to earn your BULK Academy Certification.`;
        img.classList.add('hidden');
        button.classList.add('hidden');
    }
}

function triggerConfetti() {
    const confettiColors = ['#00D4FF', '#FF6B35', '#00D97E', '#FFD93D', '#6f42c1'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.setProperty('--confetti-color', confettiColors[Math.floor(Math.random() * confettiColors.length)]);
        confetti.style.setProperty('--x', `${Math.random() * 200 - 100}vw`);
        confetti.style.setProperty('--fall-duration', `${Math.random() * 3 + 2}s`);
        confetti.style.setProperty('--fall-delay', `${Math.random() * 5}s`);
        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => confetti.remove());
    }
}

// PERPETUAL TRADING SIMULATOR
function openPerpSimulator() {
    document.getElementById('perp-simulator-modal').classList.remove('hidden');
    document.getElementById('position-setup').classList.remove('hidden');
    document.getElementById('trading-phase').classList.add('hidden');
    priceHistory = [];
    perpSimulatorState = null;
}

function closePerpSimulator() {
    document.getElementById('perp-simulator-modal').classList.add('hidden');
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

function selectPosition(type) {
    document.getElementById('long-btn').classList.toggle('active', type === 'long');
    document.getElementById('short-btn').classList.toggle('active', type === 'short');
}

function openPosition() {
    const entryPrice = parseFloat(document.getElementById('entry-price').value);
    const positionSize = parseFloat(document.getElementById('position-size').value);
    const leverage = parseInt(document.getElementById('leverage').value);
    const isLong = document.getElementById('long-btn').classList.contains('active');

    if (!entryPrice || !positionSize || !leverage) {
        alert('Please fill all fields');
        return;
    }

    perpSimulatorState = {
        entryPrice: entryPrice,
        positionSize: positionSize,
        leverage: leverage,
        isLong: isLong,
        currentPrice: entryPrice,
        markPrice: entryPrice,
        initialMargin: (entryPrice * positionSize) / leverage,
        liquidationPrice: isLong 
            ? entryPrice * (1 - (1 / leverage))
            : entryPrice * (1 + (1 / leverage))
    };

    priceHistory = [entryPrice];

    document.getElementById('position-setup').classList.add('hidden');
    document.getElementById('trading-phase').classList.remove('hidden');
    
    updateSimulatorDisplay();
    startPriceAnimation();
}

function startPriceAnimation() {
    const generatePrice = () => {
        const lastPrice = priceHistory[priceHistory.length - 1];
        const change = (Math.random() - 0.5) * lastPrice * 0.002;
        const newPrice = Math.max(lastPrice * 0.7, lastPrice + change);
        priceHistory.push(newPrice);
    };

    const updateDisplay = () => {
        if (priceHistory.length < 100) {
            generatePrice();
        } else {
            priceHistory.shift();
            generatePrice();
        }

        perpSimulatorState.currentPrice = priceHistory[priceHistory.length - 1];
        perpSimulatorState.markPrice = priceHistory[priceHistory.length - 1] * (1 + (Math.random() - 0.5) * 0.0001);

        updateSimulatorDisplay();
        updatePriceChart();

        animationFrameId = requestAnimationFrame(updateDisplay);
    };

    updateDisplay();
}

function updateSimulatorDisplay() {
    const state = perpSimulatorState;
    
    const formatPrice = (p) => '$' + p.toFixed(2);
    const formatPercent = (p) => (p >= 0 ? '+' : '') + p.toFixed(2) + '%';

    document.getElementById('display-entry').textContent = formatPrice(state.entryPrice);
    document.getElementById('current-price-display').textContent = formatPrice(state.currentPrice);
    document.getElementById('mark-price-display').textContent = formatPrice(state.markPrice);

    document.getElementById('position-type-display').textContent = state.isLong ? 'LONG' : 'SHORT';
    document.getElementById('position-type-display').className = `stat-value ${state.isLong ? 'long' : 'short'}`;
    document.getElementById('size-display').textContent = state.positionSize.toFixed(4) + ' BTC';
    document.getElementById('leverage-display').textContent = state.leverage + 'x';
    document.getElementById('initial-margin-display').textContent = formatPrice(state.initialMargin);

    let pnlValue, pnlPercent;
    if (state.isLong) {
        pnlValue = (state.markPrice - state.entryPrice) * state.positionSize;
        pnlPercent = ((state.markPrice - state.entryPrice) / state.entryPrice) * 100 * state.leverage;
    } else {
        pnlValue = (state.entryPrice - state.markPrice) * state.positionSize;
        pnlPercent = ((state.entryPrice - state.markPrice) / state.entryPrice) * 100 * state.leverage;
    }

    const pnlDisplay = document.getElementById('pnl-display');
    const pnlPercDisplay = document.getElementById('pnl-percent');
    const pnlContainer = document.getElementById('pnl-container').querySelector('.pnl-box');

    pnlDisplay.textContent = (pnlValue >= 0 ? '+' : '') + formatPrice(pnlValue);
    pnlPercDisplay.textContent = formatPercent(pnlPercent);

    pnlContainer.classList.toggle('profit', pnlValue >= 0);
    pnlContainer.classList.toggle('loss', pnlValue < 0);

    const distanceToLiq = state.isLong 
        ? ((state.markPrice - state.liquidationPrice) / state.entryPrice) * 100
        : ((state.liquidationPrice - state.markPrice) / state.entryPrice) * 100;

    document.getElementById('liquidation-price').textContent = formatPrice(state.liquidationPrice);
    document.getElementById('distance-to-liq').textContent = formatPercent(distanceToLiq);

    const barWidth = Math.max(0, Math.min(100, 50 + (distanceToLiq / 2)));
    document.getElementById('liquidation-bar').style.width = barWidth + '%';

    if ((state.isLong && state.markPrice <= state.liquidationPrice) ||
        (!state.isLong && state.markPrice >= state.liquidationPrice)) {
        document.getElementById('pnl-display').textContent = '❌ LIQUIDATED';
        cancelAnimationFrame(animationFrameId);
    }
}

function updatePriceChart() {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'rgba(15, 15, 15, 0.3)';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    if (priceHistory.length < 2) return;

    const min = Math.min(...priceHistory);
    const max = Math.max(...priceHistory);
    const range = max - min || 1;

    ctx.strokeStyle = perpSimulatorState.isLong ? '#00D97E' : '#FF6B35';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < priceHistory.length; i++) {
        const x = (i / Math.max(1, priceHistory.length - 1)) * width;
        const y = height - ((priceHistory[i] - min) / range) * height * 0.9 - height * 0.05;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 217, 61, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const entryY = height - ((perpSimulatorState.entryPrice - min) / range) * height * 0.9 - height * 0.05;
    ctx.beginPath();
    ctx.moveTo(0, entryY);
    ctx.lineTo(width, entryY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(255, 68, 68, 0.5)';
    const liqY = height - ((perpSimulatorState.liquidationPrice - min) / range) * height * 0.9 - height * 0.05;
    ctx.beginPath();
    ctx.moveTo(0, liqY);
    ctx.lineTo(width, liqY);
    ctx.stroke();
}