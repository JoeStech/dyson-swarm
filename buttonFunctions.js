export const BUTTON_CONFIG = {
    // Stage 1: Game Company Buttons
    buyOnlineAdButton: {
        text: 'Buy an online ad<br>cost: $100<br>effect: One additional game sold per cycle',
        cost: (state) => Math.floor(state.adPrice),
        cost_type: 'cash',
        repeatable: true,
        logMessage: "You've placed your first online ad! It's not much, but it's honest work. Your game is now being advertised on a number of small blogs and forums.",
        action: (state) => {
            state.onlineads++;
            state.adPrice *= 1.02;
            return {
                buttonUpdates: {
                    text: `Buy an online ad<br>cost: $${Math.floor(state.adPrice).toLocaleString()}<br>effect: One additional game sold per cycle`
                }
            };
        },
        unlocks: ['hireCFOButton']
    },

    hireCFOButton: {
        text: 'Recruit an analyst to track business metrics<br>cost: $1,000<br>effect: enables business metrics panel',
        cost: 1000,
        cost_type: 'cash',
        logMessage: "You've recruited an analyst! They're fresh out of business school and eager to prove themselves. They've set up a basic metrics tracking system using a spreadsheet they downloaded from the internet.",
        action: (state) => {
            state.hasAnalyst = true;
            return true;
        },
        unlocks: ['infoPanel', 'developNewGameButton', 'hireMarketerButton', 'profitSharingButton', 
                 'educationalGameButton', 'startFamilyOfficeButton', 'charityEventButton', 
                 'employeeWellnessButton', 'communityOutreachButton', 'sustainabilityInitiativeButton', 
                 'initiateWordOfMouthButton']
    },

    developNewGameButton: {
        text: 'Develop a new $20 game<br>cost: $10,000<br>effect: increases game revenue per sale by $20',
        cost: 10000,
        cost_type: 'cash',
        logMessage: "Congratulations! You've developed a new game. It's a quirky indie title about an AI that's trying to turn the universe into paperclips. Critics are calling it 'very derivative' but 'probably not a waste of $20'.",
        action: (state) => {
            state.gamePrice = 20;
            return true;
        },
        unlocks: ['launchBlockbusterButton']
    },

    hireMarketerButton: {
        text: 'Grow the marketing team (increases profit by 20%)<br>cost: $5,000',
        cost: 5000,
        cost_type: 'cash',
        repeatable: true,
        maxUses: 10,
        logMessage: "You've hired a marketing team! They're full of enthusiasm and questionable ideas. Their first suggestion is to rebrand your game studio to 'Pixels & Dreams: Where Code Meets Imagination'. You immediately fire them and recruit a new team, who make a much better impression.",
        action: (state) => {
            state.marketers++;
            state.adEffectiveness *= (1 + state.marketingTeamGrowth);
            state.marketingTeamClicks++;
            state.marketingTeamGrowth -= 0.02;
            return {
                buttonUpdates: {
                    text: state.marketingTeamClicks < 10 ? 
                        `Grow the marketing team (increases profit by ${(state.marketingTeamGrowth * 100).toFixed(0)}%)<br>cost: $5,000` : 
                        null,
                    hide: state.marketingTeamClicks >= 10
                }
            };
        }
    },

    launchBlockbusterButton: {
        text: 'Launch a blockbuster franchise<br>cost: $50,000,000<br>effect: 10x profit multiplier',
        cost: 50000000,
        cost_type: 'cash',
        logMessage: "You've launched a blockbuster franchise! Your game, 'Hawking Radiation Mass Energy Converter', has taken the world by storm. The hype is unreal. You're already in talks with Apple and Google to have it preloaded on all their devices.",
        action: (state) => {
            state.blockbusterMultiplier = 10;
            return true;
        },
        unlocks: ['sellCompanyButton']
    },

    profitSharingButton: {
        text: 'Profit sharing<br>cost: 10% of profit<br>effect: +5 trust',
        cost: 0,
        cost_type: 'cash',
        logMessage: "You've activated profit sharing! Your employees are thrilled, and trust is up by 5. They've started a 'Boss of the Year' fan club in your honor. The first meeting is next Tuesday, and they're expecting you to bring snacks.",
        action: (state) => {
            console.log("profitSharingButton clicked");
            state.profitSharingActive = true;
            state.trust += 5;
            return true;
        }
    },

    educationalGameButton: {
        text: 'Make a beloved educational game<br>cost: $30,000<br>effect: +2 trust',
        cost: 30000,
        cost_type: 'cash',
        logMessage: "You've created a beloved educational game! 'Math Monsters: Fraction Frenzy' is a hit with kids and parents alike. You've been invited to speak at TEDx about the importance of teaching math in a fun and engaging way. It's not the real TED, but it's a start.",
        action: (state) => {
            state.trust += 2;
            return true;
        }
    },

    startFamilyOfficeButton: {
        text: 'Start a family office<br>cost: $1,000,000<br>effect: 2x profit multiplier',
        cost: 1000000,
        cost_type: 'cash',
        logMessage: "You've started a family office! Your new team of financial advisors are ready to help you invest your fortune. They've already prepared a PowerPoint presentation entitled 'Now That You've Got Capital, Labor Is the Enemy'. You recklessly leverage against your company assets to invest, increasing your profits by 100%.",
        action: (state) => {
            state.familyOfficeActive = true;
            return true;
        }
    },

    charityEventButton: {
        text: 'Host a charity gaming event<br>cost: $50,000<br>effect: +3 trust',
        cost: 50000,
        cost_type: 'cash',
        logMessage: "You hosted a charity gaming event! The 24-hour livestream raised funds for a local children's hospital. Trust increased by 3. Your employees are still recovering from lack of sleep.",
        action: (state) => {
            state.trust += 3;
            return true;
        }
    },

    employeeWellnessButton: {
        text: 'Implement employee wellness program<br>cost: $75,000<br>effect: +4 trust, +5% productivity',
        cost: 75000,
        cost_type: 'cash',
        logMessage: "You added a full weight gym to the office! You've never seen more swole employees. Trust increased by 4, and overall productivity is up by 5%. You overhear employees discussing how their increased bone density is going to extend their lifespans.",
        action: (state) => {
            state.trust += 4;
            state.adEffectiveness *= 1.05;
            return true;
        }
    },

    communityOutreachButton: {
        text: 'Launch community outreach program<br>cost: $125,000<br>effect: +5 trust',
        cost: 125000,
        cost_type: 'cash',
        logMessage: "You've launched a community outreach program! Your company is now sponsoring coding bootcamps for underprivileged youth and hosting game development workshops. Trust increased by 5. The local newspaper called you a 'tech philanthropist', which you're pretty sure is a compliment.",
        action: (state) => {
            console.log("communityOutreachButton clicked");
            state.trust += 5;
            return true;
        }
    },

    sustainabilityInitiativeButton: {
        text: 'Implement sustainability initiative<br>cost: $2,000,000<br>effect: +10 trust',
        cost: 2000000,
        cost_type: 'cash',
        logMessage: "You decided that you don't trust third party carbon credits, so instead you implemented your own. You purchased hundreds of acres of land to fill with trees, and you've also installed solar panels and a wind turbine. Trust increased by 10.",
        action: (state) => {
            state.trust += 10;
            return true;
        }
    },

    initiateWordOfMouthButton: {
        text: 'Word of mouth<br>cost: 12 trust<br>effect: 100x sales multiplier',
        cost: 12,
        cost_type: 'trust',
        logMessage: "You've initiated a word-of-mouth campaign! Your loyal customers are now spreading the word about your games. Your sales are up by 100x. Social proof is a powerful force.",
        action: (state) => {
            state.wordOfMouthActive = true;
            return true;
        }
    },

    // Stage 2: Space Company Buttons
    rocketPropulsionButton: {
        text: 'Develop advanced rocket propulsion<br>cost: $10,000,000<br>effect: enables rocket launches',
        cost: 10000000,
        cost_type: 'cash',
        logMessage: "Your brilliant engineers have developed their first successful rocket propulsion system! It only took eight explosions, a hundred million dollars in capital, and a near death experience for an engineer named Frank, but you're now a real space company. Frank, however, has decided to leave the company and found a competitor. Somehow emboldened by an experience that might have made others fearful, he now thinks he's invincible.",
        action: (state) => {
            return true;
        },
        unlocks: ['clickButton', 'launchContractsButton', 'reusableRocketsButton', 'roboticSatelliteButton',
                 'regolithMiningButton', 'carbonCaptureButton', 'donatePayloadsButton',
                 'livestreamRecoveriesButton', 'fundDebrisTrackingButton', 'provideDisasterDataButton',
                 'openSourceBatteryButton', 'convinceGovernmentsButton']
    },

    launchContractsButton: {
        text: 'Secure a launch contract<br>cost: $5E9<br>effect: +$50,000,000 profit per cycle',
        cost: (state) => state.rocketPrice,
        cost_type: 'cash',
        repeatable: true,
        logMessage: "You've secured a new launch contract and spent the CapEx to fulfill it! A company has trusted you to provide regular launches for their satellites going forward, this is an enormous vote of confidence. Your profit will increase by $50,000,000/cycle.",
        action: (state) => {
            console.log("launchContractsButton clicked");
            state.launchContracts += 1;
            state.rocketPrice *= 1.02;
            return {
                buttonUpdates: {
                    text: `Secure a launch contract<br>cost: $${state.rocketPrice >= 1e9 ? Math.round(state.rocketPrice).toExponential(0).replace('e+', 'E') : Math.round(state.rocketPrice).toLocaleString()}<br>effect: +$50,000,000 profit per cycle`
                }
            };
        }
    },

    reusableRocketsButton: {
        text: 'Develop reusable rockets<br>cost: $5E11<br>effect: 5x launch contract profit',
        cost: 500000000000,
        cost_type: 'cash',
        logMessage: "You've developed reusable rockets! It's like not having to buy a new car every time you go on a road trip. Your launch contract profit has increased by 5x.",
        action: (state) => {
            state.launchProfit = (state.launchProfit || 1) * 5;
            return true;
        }
    },

    roboticSatelliteButton: {
        text: 'Develop robotic satellite systems<br>cost: $5E12<br>effect: 2x launch contract profit',
        cost: 5000000000000,
        cost_type: 'cash',
        logMessage: "You've developed robotic satellite systems to sell to your launch customers! They can use your off-the-shelf satellites to do automated tasks in space, like pharmaceutical manufacturing. Your launch contract profit has doubled.",
        action: (state) => {
            state.launchProfit = (state.launchProfit || 1) * 2;
            return true;
        }
    },

    regolithMiningButton: {
        text: 'Start regolith mining operations<br>cost: $5E11<br>effect: enables regolith mining',
        cost: 500000000000,
        cost_type: 'cash',
        logMessage: "You have researched regolith mining! You're now mining valuable resources from the Moon -- primarily oxygen, silicon, and aluminum, but also titanium and other elements. These resources will fetch a high price on the open market, since the cost of launching them from earth is so high.",
        action: (state) => {
            state.regolithMining = true;
            return true;
        },
        unlocks: ['regolithContractsButton']
    },

    regolithContractsButton: {
        text: 'Secure a regolith mining contract<br>cost: $5E9<br>effect: +$50,000,000 profit per cycle',
        cost: (state) => state.regolithPrice,
        cost_type: 'cash',
        repeatable: true,
        logMessage: "You've secured a new regolith mining contract and spent the CapEx to fulfill it! A company has trusted you to provide regular shipments of regolith going forward. Your profit will increase by $200,000,000/cycle.",
        action: (state) => {
            state.regolithContracts += 1;
            state.regolithPrice *= 1.02;
            return {
                buttonUpdates: {
                    text: `Secure a regolith mining contract<br>cost: $${state.regolithPrice >= 1e9 ? state.regolithPrice.toExponential(0).replace('e+', 'E') : Math.round(state.regolithPrice).toLocaleString()}<br>effect: +$50,000,000 profit per cycle`
                }
            };
        },
        unlocks: ['regolithProcessingButton', 'regolithSolarPanelsButton',
                 'regolithSuperconductorButton', 'regolithBatteriesButton']
    },

    regolithProcessingButton: {
        text: 'Develop regolith processing technology<br>cost: $1E13<br>effect: 4x regolith mining profit',
        cost: 1e+13,
        cost_type: 'cash',
        logMessage: "You've discovered advanced techniques for processing regolith, increasing purity and reducing costs! Your regolith mining profit has increased by 400%.",
        action: (state) => {
            state.regolithProfit = (state.regolithProfit) * 4;
            return true;
        }
    },

    regolithSolarPanelsButton: {
        text: 'Develop regolith solar panels<br>cost: $4E13<br>effect: 8x regolith mining profit',
        cost: 4e+13,
        cost_type: 'cash',
        logMessage: "Your engineers have developed a simple technique to convert regolith into low-efficiency solar panels! The amount of power you can produce with a space-based solar array is enormous, and the cost of manufacturing the panels is negligible. Your regolith mining profit has increased by 800%, and you're considering ways to beam excess power back to Earth for the benefit of the entire planet.",
        action: (state) => {
            state.regolithProfit = (state.regolithProfit || 1) * 8;
            return true;
        },
        unlocks: ['beamSolarPowerButton']
    },

    regolithSuperconductorButton: {
        text: 'Develop regolith superconductor<br>cost: $1E15<br>effect: 10x regolith mining profit',
        cost: 1e+15,
        cost_type: 'cash',
        logMessage: "You've developed a new extremely cheap method of converting regolith into superconducting materials! It's not a room-temperature superconductor, but the moon isn't room-temperature either. Your regolith mining profit has tripled.",
        action: (state) => {
            state.regolithProfit = (state.regolithProfit || 1) * 3;
            return true;
        }
    },

    regolithBatteriesButton: {
        text: 'Develop regolith batteries<br>cost: $5E14<br>effect: 5x regolith mining profit',
        cost: 5e+14,
        cost_type: 'cash',
        logMessage: "Your researchers have developed a new inexpensive method to convert regolith into batteries! This is the perfect companion technology to your solar panels, allowing you to more easily use the power you generate on the unlit side of the moon and creating the potential for larger power bursts when the amperage from your arrays is insufficient. Your regolith mining profit has doubled.",
        action: (state) => {
            state.regolithProfit = (state.regolithProfit || 1) * 2;
            return true;
        }
    },

    carbonCaptureButton: {
        text: 'Implement carbon capture for fuel production<br>cost: $5E14<br>effect: +10 trust',
        cost: 5e+14,
        cost_type: 'cash',
        logMessage: "Your rockets generate carbon dioxide as a byproduct of combustion, which is both a problem for the biosphere and also a potential resource. To kill two birds with one stone, you develop carbon extraction technology to convert CO2 to methane for your rocket launches, ensuring that your rockets are carbon-negative. Trust increased by 10.",
        action: (state) => {
            state.trust += 10;
            return true;
        }
    },

    donatePayloadsButton: {
        text: 'Donate small payloads to universities and non-profits<br>cost: $1E8<br>effect: +5 trust',
        cost: 100000000,
        cost_type: 'cash',
        logMessage: "There is often unused space on your launches for small payloads. You donate this space to universities and non-profits for the benefit of science and humanity. Trust increased by 5.",
        action: (state) => {
            state.trust += 5;
            return true;
        }
    },

    livestreamRecoveriesButton: {
        text: 'Livestream rocket recoveries<br>cost: $5,000,000<br>effect: +3 trust',
        cost: 5000000,
        cost_type: 'cash',
        logMessage: "Every aspect of your launches is now livestreamed, to ensure that the public knows that you are a responsible and transparent company. Trust increased by 3.",
        action: (state) => {
            state.trust += 3;
            return true;
        }
    },

    fundDebrisTrackingButton: {
        text: 'Fund orbital debris tracking<br>cost: $5E11<br>effect: +7 trust',
        cost: 500000000000,
        cost_type: 'cash',
        logMessage: "Kessler Syndrome is a genuine threat to a future in space, so you've funded the development of the most advanced debris tracking system in history. Debris down to millimeters in size can now be tracked and avoided. Trust increased by 7.",
        action: (state) => {
            state.trust += 7;
            return true;
        }
    },

    beamSolarPowerButton: {
        text: 'Beam solar array power to Earth<br>cost: $1E16<br>effect: +40 trust',
        cost: 1e+16,
        cost_type: 'cash',
        logMessage: "With your combined resources, you and Frank were able to complete the largest philanthropic project humanity has ever seen -- the complete replacement of all remaining fossil fuel and nuclear power plants in the world with solar power beamed from your orbital solar arrays. World governments were uneasy with your growing control of space resources, but this gesture has assured them of your good intentions. Trust increased by 40.",
        action: (state) => {
            state.trust += 40;
            return true;
        }
    },

    provideDisasterDataButton: {
        text: 'Provide governments with real-time natural disaster data<br>cost: $1E8<br>effect: +15 trust',
        cost: 100000000,
        cost_type: 'cash',
        logMessage: "Your satellites have such granular real-time data that your natural disaster prediction algorithms are the most accurate in the world. You provide this data to governments to help them prepare for disasters. Trust increased by 15.",
        action: (state) => {
            state.trust += 15;
            return true;
        }
    },

    openSourceBatteryButton: {
        text: 'Open source battery technology<br>cost: $2E8<br>effect: +25 trust',
        cost: 200000000,
        cost_type: 'cash',
        logMessage: "Cheap batteries are even more useful on earth than they are in space, due to cloud cover and day/night cycles. You decide to open-source your battery technology to help humanity transition to a sustainable future. Trust increased by 25.",
        action: (state) => {
            state.trust += 25;
            return true;
        }
    },

    convinceGovernmentsButton: {
        text: 'Convince world governments to allow moon mass driver construction<br>cost: 100 trust<br>effect: enables mass driver construction',
        cost: 100,
        cost_type: 'trust',
        logMessage: "Your universal popularity with voters around the globe has convinced world governments that you can be trusted with the incredible responsibility of building a mass driver on the moon.",
        action: (state) => {
            return true;
        },
        stageTransition: 'beginMassDriverStage',
        unlocks: ['regolithContractsButtonStage3', 'rotaryPelletCannonButton']
    },

    // Stage 3: Mass Driver Buttons
    regolithContractsButtonStage3: {
        text: 'Secure a regolith mining contract<br>cost: $5E7<br>effect: +$200,000,000 profit per cycle',
        cost: (state) => state.regolithPrice,
        cost_type: 'cash',
        repeatable: true,
        logMessage: "A period of hyperinflation has begun, and the cost of equipment to fulfill your mining contracts will continue to rise.",
        action: (state) => {
            state.regolithContracts += 1;
            state.regolithPrice *= 1.02;
            return {
                buttonUpdates: {
                    text: `Secure a regolith mining contract<br>cost: ${state.regolithPrice >= 1e9 ? state.regolithPrice.toExponential(0).replace('e+', 'E') : state.regolithPrice.toLocaleString()}<br>effect: +$200,000,000 profit per cycle`
                }
            };
        },
    },

    rotaryPelletCannonButton: {
        text: 'Build rotary pellet launcher<br>cost: $1E12<br>effect: +10 tons per cycle',
        cost: (state) => state.pelletLauncherPrice || 1000000000000,
        cost_type: 'cash',
        repeatable: true,
        logMessage: "Rotary pellet launcher built! You are now flinging 10 tons of marble-sized regolith pellets at the earth-moon L5 point per cycle. You'll need ten billion tons of mass at the L5 point to build your first O'Neill Cylinder, so one launcher isn't going to cut it.",
        action: (state) => {
            if (!state.pelletLauncherPrice) state.pelletLauncherPrice = 1000000000000;
            state.massDrivers1 += 1;
            state.pelletLauncherPrice *= 1.02;
            return {
                buttonUpdates: {
                    text: `Build rotary pellet launcher<br>cost: $${state.pelletLauncherPrice >= 1e9 ? state.pelletLauncherPrice.toExponential(0).replace('e+', 'E') : state.pelletLauncherPrice.toLocaleString()}<br>effect: +10 tons per cycle`
                }
            };
        },
        unlocks: ['transportLinearAcceleratorButton']
    },

    transportLinearAcceleratorButton: {
        text: 'Build transport linear accelerator<br>cost: $1E14<br>effect: +1,000 tons per cycle',
        cost: (state) => state.acceleratorPrice || 100000000000000,
        cost_type: 'cash',
        repeatable: true,
        logMessage: "Transport linear accelerator built! This advanced mass driver can fling 1,000 tons of regolith per cycle at the earth-moon L5 point.",
        action: (state) => {
            if (!state.acceleratorPrice) state.acceleratorPrice = 100000000000000;
            state.massDrivers2 += 1;
            state.acceleratorPrice *= 1.02;
            return {
                buttonUpdates: {
                    text: `Build transport linear accelerator<br>cost: $${state.acceleratorPrice >= 1e9 ? state.acceleratorPrice.toExponential(0).replace('e+', 'E') : state.acceleratorPrice.toLocaleString()}<br>effect: +1,000 tons per cycle`
                }
            };
        },
        unlocks: ['dynamicMagneticLevitationButton', 'advancedAlloysButton']
    },

    advancedAlloysButton: {
        text: 'Develop advanced alloys<br>cost: $1E15<br>effect: 3x mass driver output and 6x mining profit',
        cost: 1e+15,
        cost_type: 'cash',
        logMessage: "Advanced alloys developed! Your mass drivers can now withstand greater accelerations, doubling your mass driver output. This also increases the value of your mining contracts by 400%.",
        action: (state) => {
            state.massDriverOutput1 *= 3;
            state.massDriverOutput2 *= 3;
            state.regolithProfit *= 6;
            return true;
        }
    },

    dynamicMagneticLevitationButton: {
        text: 'Implement dynamic magnetic levitation<br>cost: $5E15<br>effect: 3x mass driver output',
        cost: 5e+15,
        cost_type: 'cash',
        logMessage: "Dynamic magnetic levitation researched! With better ability to control magnetic fields, you can reduce strain on the moving parts of your mass drivers, increasing your mass driver output by 300%.",
        action: (state) => {
            state.massDriverOutput1 *= 3;
            state.massDriverOutput2 *= 3;
            return true;
        },
        unlocks: ['increasedBatteryDrawButton', 'magneticFieldHypercontrolButton', 'advancedCoolingSystemsButton', 'selfRepairingStructuresButton']
    },

    increasedBatteryDrawButton: {
        text: 'Research increased battery draw<br>cost: $8E15<br>effect: 5x mass driver output, 5x mining profit',
        cost: 8000000000000000,
        cost_type: 'cash',
        logMessage: "Battery draw increased! Your mass drivers can now pull greater amperage from your batteries, increasing your mass driver output by 500%. This also improves mining operations, increasing the value of your mining contracts by 500%.",
        action: (state) => {
            state.massDriverOutput1 *= 5;
            state.massDriverOutput2 *= 5;
            state.regolithProfit *= 5;
            return true;
        }
    },

    magneticFieldHypercontrolButton: {
        text: 'Develop magnetic field hypercontrol<br>cost: $2E16<br>effect: 5x mass driver output, 10x mining profit',
        cost: 20000000000000000,
        cost_type: 'cash',
        logMessage: "Magnetic field hypercontrol developed! With the ability to control magnetic fields with incredible precision, your mass driver designs are now 10x more efficient. You also retrofit this technology to your mining equipment, increasing mining contract value by 10x.",
        action: (state) => {
            state.massDriverOutput1 *= 10;
            state.massDriverOutput2 *= 10;
            state.regolithProfit *= 10;
            return true;
        }
    },

    advancedCoolingSystemsButton: {
        text: 'Implement advanced cooling systems<br>cost: $1E17<br>effect: 3x mass driver output',
        cost: 1e+17,
        cost_type: 'cash',
        logMessage: "There's only so much heat that you can radiate away into space, even with massive radiator arrays! You harness the moon itself as a heat sink, increasing your mass driver output by 300%.",
        action: (state) => {
            state.massDriverOutput1 *= 3;
            state.massDriverOutput2 *= 3;
            return true;
        }
    },

    selfRepairingStructuresButton: {
        text: 'Develop self-repairing structures<br>cost: $5E17<br>effect: 10x mass driver output',
        cost: 5e+17,
        cost_type: 'cash',
        logMessage: "With self-repairing structures, your mass drivers go to almost zero downtime. Your mass driver output is increased by 1000%.",
        action: (state) => {
            state.massDriverOutput1 *= 10;
            state.massDriverOutput2 *= 10;
            return true;
        }
    },

    completeCylinderButton: {
        text: 'Construct the O\'Neill Cylinder<br>cost: 1E10 tons<br>effect: enables swarm stage',
        cost: 10000000000,
        cost_type: 'mass',
        logMessage: "You've completed construction of your first O'Neill Cylinder! This is just the beginning of humanity's journey to the stars.",
        action: (state) => {
            state.isMassDriverCompany = false;
            state.isSwarmCompany = true;
            return true;
        },
        stageTransition: 'beginSwarmStage'
    },

    // Stage 4: Dyson Swarm Buttons
    asteroidMiningButton: {
        text: 'Establish asteroid mining operations<br>cost: 1E11 tons<br>effect: enables mining platforms',
        cost: 1e+11,
        cost_type: 'mass',
        logMessage: "Asteroid mining operations established! It is now possible to build orbital mining platforms that incorporate all you've learned from mining the moon. These massive platforms contain built-in mass drivers, producing immense amounts of feedstock matter for the swarm.",
        action: (state) => {
            return true;
        },
        unlocks: ['platform1Button']
    },

    platform1Button: {
        text: 'Build mining platform<br>cost: 1E11 tons<br>effect: +1 billion tons per cycle',
        cost: (state) => state.platformPrice || 1e+11,
        cost_type: 'mass',
        repeatable: true,
        logMessage: "You have constructed your first mining platform! It is truly a marvel of engineering, with a production capacity of a billion tons of matter per cycle.",
        action: (state) => {
            state.miningPlatforms += 1;
            return true;
        },
        unlocks: ['shipyardButton']
    },

    shipyardButton: {
        text: 'Build habitat shipyard<br>cost: 1E12 tons<br>effect: +1 cylinder per cycle',
        cost: 1e+12,
        cost_type: 'mass',
        repeatable: true,
        logMessage: "You have constructed your first shipyard to automate O'Neill Cylinder construction! This immense manufacturing facility can produce cylinders at a rate of one per cycle, provided you have enough resources.",
        action: (state) => {
            state.shipyards += 1;
            return true;
        },
        unlocks: ['moonsButton', 'gasGiantButton']
    },

    moonsButton: {
        text: 'Controlled moon fragmentation<br>cost: 5E11 tons<br>effect: 8x mining platform output',
        cost: 5e+11,
        cost_type: 'mass',
        logMessage: "You can now fragment moon-sized celestial bodies with precision, radically increasing speed of mass extraction. Matter generation increased by 800%.",
        action: (state) => {
            state.miningPlatformOutput *= 8;
            return true;
        }
    },

    gasGiantButton: {
        text: 'Electromagnetic scoop<br>cost: 5E11 tons<br>effect: 4x mining platform output',
        cost: 5e+11,
        cost_type: 'mass',
        logMessage: "Gas giant mining operations established! Mining platforms are now outfitted with an electromagnetic scoop for processing gasses, along with robust radiation shielding and reinforcements to withstand immense gravitational forces. Matter generation increased by 400%.",
        action: (state) => {
            state.miningPlatformOutput *= 4;
            return true;
        },
        unlocks: ['solarNetworkButton', 'volunteersButton', 'planetDismantlingButton', 'vonNeumannButton', 'starLiftingButton', 'vonNeumann2Button', 'quantumShipyardOptimizationButton']
    },

    solarNetworkButton: {
        text: 'Solar mirror system network<br>cost: 8E13 tons<br>effect: 5x mining platform output',
        cost: 8e+13,
        cost_type: 'mass',
        logMessage: "Solar mirrors in orbit of the sun can now be synchronized across vast distances in order to focus powerful beams of radiation onto mining targets! Matter generation increased by 500%.",
        action: (state) => {
            state.miningPlatformOutput *= 5;
            return true;
        }
    },

    volunteersButton: {
        text: 'Construction volunteers<br>cost: 1E14 tons<br>effect: scale habitat production by population',
        cost: 1e+14,
        cost_type: 'mass',
        logMessage: "You have redirected resources to outfit space-based volunteers that want to build new habitats. Habitat generation is now scaled by the base 10 logarithm of the total population of off-planet humans.",
        action: (state) => {
            state.volunteers = true;
            return true;
        }
    },

    planetDismantlingButton: {
        text: 'Dismantle rocky planets<br>cost: 2E15 tons<br>effect: 10x mining platform output',
        cost: 2e+15,
        cost_type: 'mass',
        logMessage: "Superconducting orbital rings constructed around the inner planets, allowing rapid dismantling. You leave the earth alone for sentimental reasons, despite the fact that it has enough mass for nearly six hundred billion habitats. Mass generation increased by 10x.",
        action: (state) => {
            state.miningPlatformOutput *= 10;
            return true;
        }
    },

    vonNeumannButton: {
        text: 'Von Neumann retrofit for mining platforms<br>cost: 1E16 tons<br>effect: mining platforms self-replicate every cycle',
        cost: 1e+16,
        cost_type: 'mass',
        logMessage: "You have retrofitted your mining platforms with a von Neumann feature, allowing them to self-replicate. Mass generation begins to increase exponentially.",
        action: (state) => {
            state.vonNeumann = true;
            return true;
        }
    },

    vonNeumann2Button: {
        text: 'Von Neumann retrofit for shipyards<br>cost: 3E17 tons<br>effect: shipyards self-replicate every cycle',
        cost: 3e+17,
        cost_type: 'mass',
        logMessage: "You have retrofitted your shipyards with a von Neumann feature, allowing them to self-replicate and expand the swarm. Habitat production begins to increase exponentially.",
        action: (state) => {
            state.vonNeumann2 = true;
            return true;
        }
    },

    repurposeMiningPlatformsButton: {
        text: 'Repurpose mining platforms to produce habitats<br>cost: 1E23 tons<br>effect: converts all mining platforms to shipyards',
        cost: 1e23,
        cost_type: 'mass',
        logMessage: "You have repurposed your mining platforms for habitat production. Your civilization is galvanized, knowing they are on the cusp of becoming a type two Kardeshev civilization.",
        action: (state) => {
            state.shipyards += state.miningPlatforms;
            state.miningPlatforms = 0;
            return true;
        }
    },

    starLiftingButton: {
        text: 'Begin star lifting<br>cost: 1E18 tons<br>effect: 500x mining platform output',
        cost: 1e+18,
        cost_type: 'mass',
        logMessage: "You construct the most massive industrial platform in human history, a ring current around the star's equator. This current generates a powerful toroidal magnetic field with its dipoles over the star's rotational poles. This deflects the star's solar wind into a pair of jets aligned along its rotational axis passing through a pair of magnetic rocket nozzles. The platform also uses your solar mirrors to concentrate energy in a small area of the solar surface, creating a sustained solar flare to eject matter from the star, which is then collected by the toroidal magnetic field and ejected from the poles, cooled, and collected. Mass generation increased by 500x.",
        action: (state) => {
            state.miningPlatformOutput *= 500;
            return true;
        }
    },

    quantumShipyardOptimizationButton: {
        text: 'Implement quantum-scale shipyard optimization<br>cost: 1E20 tons<br>effect: 100x shipyard output',
        cost: 1e+20,
        cost_type: 'mass',
        logMessage: "Your engineers have achieved a breakthrough in quantum-scale manufacturing optimization. By leveraging quantum tunneling effects in a carefully controlled vacuum, combined with femtosecond-precision laser arrays and quantum-entangled matter streams, you've created a revolutionary new shipyard architecture. The new design uses probability manipulation to simultaneously construct multiple quantum states of each habitat component, collapsing them into the desired configuration only at the final stage. This reduces construction time by 300% and somehow makes the habitats more aesthetically pleasing, though no one can explain why.",
        action: (state) => {
            state.shipyardOutput *= 100;
            return true;
        }
    }
};