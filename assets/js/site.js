const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

const SERVICE_CONFIG = {
    "Pressure washing": {
        ranges: { small: [250, 425], medium: [425, 700], large: [700, 1200] },
        approach: "Clean Surface matches the cleaning method to the surface instead of treating every material the same way."
    },
    "House washing": {
        ranges: { small: [325, 475], medium: [475, 725], large: [725, 1100] },
        approach: "Most house washing jobs are handled with low-pressure soft washing for stucco, paint, and trim."
    },
    "Driveway cleaning": {
        ranges: { small: [175, 275], medium: [275, 425], large: [425, 650] },
        approach: "Driveway work usually starts with pretreatment and may include hot-water steam for oil, rust, or stubborn staining.",
        guarantee: "Driveway quotes can include the written money-back guarantee when Steve recommends a treatment."
    },
    "Patio or pool deck cleaning": {
        ranges: { small: [200, 325], medium: [325, 550], large: [550, 875] },
        approach: "Patio and pool deck cleaning focuses on brightening outdoor living areas and improving how the surface feels underfoot."
    },
    "Commercial pressure washing": {
        ranges: { small: [350, 700], medium: [700, 1450], large: [1450, 3200] },
        approach: "Commercial pricing changes quickly based on square footage, access, and how much grease or foot traffic the surface sees."
    },
    "Hot-water steam cleaning": {
        ranges: { small: [275, 475], medium: [475, 850], large: [850, 1600] },
        approach: "Hot-water steam is typically the better fit for gum, grease, oil, and grime that cold water struggles to break down."
    },
    "Window cleaning": {
        ranges: { small: [175, 300], medium: [300, 550], large: [550, 900] },
        approach: "Window cleaning pricing changes most based on pane count, access, interior versus exterior scope, and whether tracks and screens are included."
    }
};

const SERVICE_ICONS = {
    "Pressure washing": "✦",
    "House washing": "🏠",
    "Driveway cleaning": "🚗",
    "Patio or pool deck cleaning": "☀",
    "Commercial pressure washing": "🏢",
    "Hot-water steam cleaning": "♨",
    "Window cleaning": "🪟"
};

const SERVICE_ADDONS = {
    "House washing": [
        { id: "fence", label: "Fence cleaning", price: 85 },
        { id: "gutters-ext", label: "Gutter exterior wash", price: 65 }
    ],
    "Driveway cleaning": [
        { id: "oil-treat", label: "Oil stain pretreatment", price: 75 },
        { id: "rust-treat", label: "Rust treatment", price: 60 }
    ],
    "Patio or pool deck cleaning": [
        { id: "algae", label: "Algae / moss treatment", price: 45 },
        { id: "furniture", label: "Move patio furniture", price: 35 }
    ],
    "Commercial pressure washing": [
        { id: "gum", label: "Gum removal add-on", price: 65 },
        { id: "dumpster", label: "Dumpster pad cleaning", price: 95 }
    ],
    "Hot-water steam cleaning": [
        { id: "degreaser", label: "Heavy degreaser pretreat", price: 55 },
        { id: "multi", label: "Second surface discount", price: -50 }
    ],
    "Window cleaning": [
        { id: "screens", label: "Screen cleaning", price: 40 },
        { id: "tracks", label: "Track and sill detail", price: 30 }
    ]
};

const SLIDER_SCALES = {
    service: {
        fieldLabel: "What needs cleaning?",
        hint: "Slide or tap the choice that feels closest.",
        metaHint: "Hover or tap a label for a plain-English explanation.",
        steps: [
            {
                value: "Pressure washing",
                label: "Not sure",
                helpTitle: "Not sure yet",
                helpText: "Pick this if you just know the outside needs attention and want the team to point you to the right service.",
                summaryLabel: "exterior cleaning",
                requestLabel: "help choosing the right service"
            },
            {
                value: "House washing",
                label: "House",
                helpTitle: "House washing",
                helpText: "This means cleaning the outside walls, trim, and dusty buildup on the home."
            },
            {
                value: "Driveway cleaning",
                label: "Driveway",
                helpTitle: "Driveway cleaning",
                helpText: "This is for the concrete out front, including dirt, tire marks, oil spots, and the wear people see first."
            },
            {
                value: "Patio or pool deck cleaning",
                label: "Patio",
                helpTitle: "Patio or pool deck cleaning",
                helpText: "This is for backyard hangout spaces like patios, pool decks, pavers, and other outdoor hard surfaces."
            },
            {
                value: "Commercial pressure washing",
                label: "Business",
                helpTitle: "Commercial cleaning",
                helpText: "This is for storefronts, sidewalks, dumpster areas, and other surfaces customers or tenants see."
            },
            {
                value: "Hot-water steam cleaning",
                label: "Steam",
                helpTitle: "Hot-water steam cleaning",
                helpText: "This is for oily, greasy, or really stuck-on buildup that usually needs extra heat to break loose."
            },
            {
                value: "Window cleaning",
                label: "Windows",
                helpTitle: "Window cleaning",
                helpText: "This covers home or business windows, including the glass plus frames, tracks, sills, and screens when needed."
            }
        ]
    },
    area: {
        fieldLabel: "Where is the property?",
        hint: "Choose the part of the Valley that fits best.",
        metaHint: "This helps keep the estimate tied to the service area.",
        steps: [
            {
                value: "Phoenix",
                label: "Phoenix",
                helpTitle: "Phoenix area",
                helpText: "Best fit for Phoenix homes, neighborhoods, and nearby properties that are closer to central or north Phoenix."
            },
            {
                value: "Scottsdale / Paradise Valley",
                label: "Scottsdale",
                helpTitle: "Scottsdale or Paradise Valley",
                helpText: "Best fit for Scottsdale, Paradise Valley, and nearby upscale residential or commercial areas."
            },
            {
                value: "East Valley",
                label: "East Valley",
                helpTitle: "East Valley",
                helpText: "Best fit for Mesa, Gilbert, Chandler, and Tempe properties."
            },
            {
                value: "West Valley",
                label: "West Valley",
                helpTitle: "West Valley",
                helpText: "Best fit for Glendale, Peoria, and nearby west-side neighborhoods."
            }
        ]
    },
    size: {
        fieldLabel: "How much needs cleaning?",
        hint: "Think about the amount of space, not exact square footage.",
        metaHint: "This is about how much of the property is involved.",
        steps: [
            {
                value: "Small",
                key: "small",
                label: "Small",
                helpTitle: "Small job",
                helpText: "Usually one main area, like just the driveway, just the front of the house, or a smaller patio."
            },
            {
                value: "Medium",
                key: "medium",
                label: "Medium",
                helpTitle: "Medium job",
                helpText: "Usually a standard home job or a couple of areas that need attention at the same visit."
            },
            {
                value: "Large",
                key: "large",
                label: "Large",
                helpTitle: "Large job",
                helpText: "Usually a bigger property, multiple surfaces, or a job that will take more time, setup, and cleanup."
            }
        ]
    },
    condition: {
        fieldLabel: "How dirty does it look right now?",
        hint: "Choose the level that feels closest.",
        metaHint: "This is about what you can see, not technical stain terms.",
        steps: [
            {
                value: "Light dust or maintenance clean",
                label: "Light",
                helpTitle: "Light buildup",
                helpText: "Mostly dust, normal weathering, or a routine cleanup. No major stains are jumping out yet."
            },
            {
                value: "Moderate buildup or staining",
                label: "Moderate",
                helpTitle: "Moderate buildup",
                helpText: "The surface looks dingy or patchy, and there are some visible stains or dirty areas that stand out."
            },
            {
                value: "Heavy stains, grease, gum, or hard water",
                label: "Heavy",
                helpTitle: "Heavy buildup",
                helpText: "The surface has obvious staining, stuck-on grime, grease, hard-water marks, or buildup that has been sitting for a while."
            }
        ]
    },
    timeline: {
        fieldLabel: "How soon do you want it done?",
        hint: "Pick the timing that feels closest.",
        metaHint: "This helps set expectations for the next step.",
        steps: [
            {
                value: "This week",
                label: "Soon",
                helpTitle: "As soon as possible",
                helpText: "Pick this if the job is time-sensitive and you want the team to try to work you in quickly."
            },
            {
                value: "Next 2 weeks",
                label: "2 weeks",
                helpTitle: "Within the next two weeks",
                helpText: "Pick this if you want it handled soon but you are not in a same-week rush."
            },
            {
                value: "Flexible",
                label: "Flexible",
                helpTitle: "Flexible timing",
                helpText: "Pick this if you are planning ahead or want the easiest schedule fit."
            }
        ]
    },
    contact: {
        fieldLabel: "How should Clean Surface reply?",
        hint: "Choose the reply method you want most.",
        metaHint: "We will include this preference in the request.",
        steps: [
            {
                value: "Text",
                label: "Text",
                helpTitle: "Reply by text",
                helpText: "Best if you want quick back-and-forth updates without stopping for a phone call."
            },
            {
                value: "Call",
                label: "Call",
                helpTitle: "Reply by call",
                helpText: "Best if you would rather talk the job through live and ask follow-up questions right away."
            },
            {
                value: "Email",
                label: "Email",
                helpTitle: "Reply by email",
                helpText: "Best if you want the details in writing and would rather review them in your inbox."
            }
        ]
    }
};

const CONDITION_FACTORS = {
    "Light dust or maintenance clean": [1, 1.05],
    "Moderate buildup or staining": [1.08, 1.18],
    "Heavy stains, grease, gum, or hard water": [1.2, 1.38]
};

const CITY_TO_AREA = {
    Phoenix: "Phoenix",
    Scottsdale: "Scottsdale / Paradise Valley",
    "Paradise Valley": "Scottsdale / Paradise Valley",
    Mesa: "East Valley",
    Gilbert: "East Valley",
    Chandler: "East Valley",
    Tempe: "East Valley",
    Glendale: "West Valley",
    Peoria: "West Valley"
};

const OFFICE_CALL = "tel:4802983416";
const OFFICE_SMS = "sms:+14802983416";
const OFFICE_EMAIL = "info@cleansurfacepressurewashing.com";
const ESTIMATOR_PREFILL_KEY = "clean-surface-estimator-prefill";

function readEstimatorPrefill() {
    const params = new URLSearchParams(window.location.search);
    let stored = {};

    try {
        stored = JSON.parse(window.localStorage.getItem(ESTIMATOR_PREFILL_KEY) || "{}");
    } catch (error) {
        stored = {};
    }

    return {
        name: (params.get("name") || stored.name || "").trim(),
        phone: (params.get("phone") || params.get("tel") || stored.phone || "").trim(),
        email: (params.get("email") || stored.email || "").trim(),
        service: (params.get("service") || stored.service || "").trim(),
        city: (params.get("city") || stored.city || "").trim(),
        timeline: (params.get("timeline") || stored.timeline || "").trim()
    };
}

function saveEstimatorPrefill(values) {
    try {
        window.localStorage.setItem(
            ESTIMATOR_PREFILL_KEY,
            JSON.stringify({
                name: (values.name || "").trim(),
                phone: (values.phone || "").trim(),
                email: (values.email || "").trim(),
                service: (values.service || "").trim(),
                city: (values.city || "").trim(),
                timeline: (values.timeline || "").trim()
            })
        );
    } catch (error) {
        // Ignore storage failures.
    }
}

function getFormValue(form, name) {
    const field = form.querySelector("[name='" + name + "']");
    return (field?.value || form.dataset[name] || "").trim();
}

function roundToTwentyFive(value) {
    return Math.max(25, Math.round(value / 25) * 25);
}

function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(value);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getScaleConfig(scale) {
    return SLIDER_SCALES[scale] || { steps: [] };
}

function getScaleStep(scale, rawValue) {
    const config = getScaleConfig(scale);
    const steps = config.steps || [];
    const numeric = Number(rawValue);
    return steps[numeric] || steps[0] || null;
}

function getSliderLabel(scale, rawValue) {
    const step = getScaleStep(scale, rawValue);
    return step ? step.value : "";
}

function buildEstimate(service, sizeKey, condition) {
    const config = SERVICE_CONFIG[service] || SERVICE_CONFIG["Pressure washing"];
    const sizeToken = (sizeKey || "medium").toLowerCase();
    const range = config.ranges[sizeToken] || config.ranges.medium;
    const conditionFactor = CONDITION_FACTORS[condition] || [1.08, 1.18];
    const low = roundToTwentyFive(range[0] * conditionFactor[0]);
    const high = roundToTwentyFive(range[1] * conditionFactor[1]);

    return { config, low, high };
}

function findStepIndex(scale, preferredValue) {
    const config = getScaleConfig(scale);
    const normalized = (preferredValue || "").trim().toLowerCase();

    if (!normalized) {
        return 0;
    }

    const matchIndex = config.steps.findIndex(function (step) {
        return step.value.toLowerCase() === normalized || step.label.toLowerCase() === normalized;
    });

    return matchIndex >= 0 ? matchIndex : 0;
}

function getDefaultAreaIndex(preferredCity) {
    const areaValue = CITY_TO_AREA[preferredCity] || preferredCity;
    return findStepIndex("area", areaValue);
}

function buildLivePricePanel(formId) {
    return (
        '<div class="est-live" aria-live="polite" aria-atomic="true">' +
            '<div class="est-live-left">' +
                '<span class="est-live-label">Ballpark estimate</span>' +
                '<span class="est-live-range" id="' + formId + '-live-range">\u2014</span>' +
            '</div>' +
            '<span class="est-live-hint">Updates as you make selections</span>' +
        '</div>'
    );
}

function buildCardField(formId, scale, defaultIndex, stepNum) {
    const config = getScaleConfig(scale);
    const steps = config.steps || [];

    const cards = steps.map(function (step, index) {
        const icon = SERVICE_ICONS[step.value] || "";
        const isActive = index === defaultIndex;
        return (
            '<button type="button" class="est-card' + (isActive ? " is-active" : "") + '"' +
            ' data-field="' + scale + 'Level" data-index="' + String(index) + '">' +
                (icon ? '<span class="est-card-icon" aria-hidden="true">' + icon + '</span>' : "") +
                '<span class="est-card-label">' + escapeHtml(step.label) + '</span>' +
            '</button>'
        );
    }).join("");

    return (
        '<div class="est-step">' +
            '<div class="est-step-header">' +
                (stepNum ? '<span class="est-step-num" aria-hidden="true">' + String(stepNum).padStart(2, "0") + '</span>' : "") +
                '<span class="est-step-label">' + escapeHtml(config.fieldLabel) + '</span>' +
            '</div>' +
            '<input type="hidden" name="' + scale + 'Level" value="' + String(defaultIndex) + '">' +
            '<div class="est-cards" role="group" aria-label="' + escapeHtml(config.fieldLabel) + '">' +
                cards +
            '</div>' +
            '<p class="est-step-hint">' + escapeHtml(config.hint) + '</p>' +
        '</div>'
    );
}

function buildPillField(formId, scale, defaultIndex, stepNum) {
    const config = getScaleConfig(scale);
    const steps = config.steps || [];

    const pills = steps.map(function (step, index) {
        const isActive = index === defaultIndex;
        return (
            '<button type="button" class="est-pill' + (isActive ? " is-active" : "") + '"' +
            ' data-field="' + scale + 'Level" data-index="' + String(index) + '">' +
                escapeHtml(step.label) +
            '</button>'
        );
    }).join("");

    return (
        '<div class="est-step est-step-row">' +
            '<div class="est-step-header">' +
                (stepNum ? '<span class="est-step-num" aria-hidden="true">' + String(stepNum).padStart(2, "0") + '</span>' : "") +
                '<span class="est-step-label">' + escapeHtml(config.fieldLabel) + '</span>' +
            '</div>' +
            '<input type="hidden" name="' + scale + 'Level" value="' + String(defaultIndex) + '">' +
            '<div class="est-pills" role="group" aria-label="' + escapeHtml(config.fieldLabel) + '">' +
                pills +
            '</div>' +
        '</div>'
    );
}

function buildAddonsSection(formId) {
    const groups = Object.keys(SERVICE_ADDONS).map(function (service) {
        const items = SERVICE_ADDONS[service].map(function (addon) {
            const priceLabel = addon.price < 0 ? "\u2212$" + Math.abs(addon.price) : "+$" + addon.price;
            return (
                '<label class="est-addon-item">' +
                    '<input type="checkbox" name="addon-' + addon.id + '" data-price="' + addon.price + '" data-service="' + escapeHtml(service) + '">' +
                    '<span class="est-addon-name">' + escapeHtml(addon.label) + '</span>' +
                    '<span class="est-addon-price">' + priceLabel + '</span>' +
                '</label>'
            );
        }).join("");
        return '<div class="est-addon-group" data-for-service="' + escapeHtml(service) + '" hidden>' + items + '</div>';
    }).join("");

    return (
        '<div class="est-step est-step-addons" id="' + formId + '-addons">' +
            '<div class="est-step-header">' +
                '<span class="est-step-num est-step-num-alt" aria-hidden="true">\u2731</span>' +
                '<span class="est-step-label">Any extras to add?</span>' +
            '</div>' +
            '<div class="est-addon-groups">' + groups + '</div>' +
            '<p class="est-addons-empty">Select a service above to see available add-ons.</p>' +
        '</div>'
    );
}

function goToWizardStep(form, stepNum) {
    form.querySelectorAll(".est-wizard-panel").forEach(function (panel) {
        panel.classList.toggle("is-active", Number(panel.dataset.wizardStep) === stepNum);
    });
    form.querySelectorAll(".est-progress-step").forEach(function (btn) {
        const target = Number(btn.dataset.gotoStep);
        btn.classList.toggle("is-active", target === stepNum);
        btn.classList.toggle("is-done", target < stepNum);
    });
}

function renderEstimatorForm(form, index) {
    const prefill = readEstimatorPrefill();
    const existingService = form.dataset.service || prefill.service || "";
    const existingCity = form.dataset.city || prefill.city || "";
    const serviceIndex = findStepIndex("service", existingService);
    const areaIndex = getDefaultAreaIndex(existingCity || "Phoenix");
    const sizeIndex = findStepIndex("size", "Medium");
    const conditionIndex = findStepIndex("condition", "Moderate buildup or staining");
    const timelineIndex = findStepIndex("timeline", prefill.timeline || "Next 2 weeks");
    const contactIndex = findStepIndex("contact", "Text");
    const formId = "estimator-" + String(index + 1);

    form.innerHTML =
        buildLivePricePanel(formId) +
        '<nav class="est-progress" aria-label="Estimator steps">' +
            '<button type="button" class="est-progress-step is-active" data-goto-step="1">01&nbsp;Service</button>' +
            '<span class="est-progress-sep" aria-hidden="true">›</span>' +
            '<button type="button" class="est-progress-step" data-goto-step="2">02&nbsp;Details</button>' +
            '<span class="est-progress-sep" aria-hidden="true">›</span>' +
            '<button type="button" class="est-progress-step" data-goto-step="3">03&nbsp;Contact</button>' +
        '</nav>' +
        // Panel 1: Service + Size
        '<div class="est-wizard-panel is-active" data-wizard-step="1">' +
            buildCardField(formId, "service", serviceIndex) +
            buildPillField(formId, "size", sizeIndex) +
            '<div class="est-wizard-nav">' +
                '<span></span>' +
                '<button type="button" class="button button-primary est-btn-next" data-next-step="2">Details &rarr;</button>' +
            '</div>' +
        '</div>' +
        // Panel 2: Condition + Add-ons + Area + Timeline
        '<div class="est-wizard-panel" data-wizard-step="2">' +
            buildPillField(formId, "condition", conditionIndex) +
            buildAddonsSection(formId) +
            buildPillField(formId, "area", areaIndex) +
            buildPillField(formId, "timeline", timelineIndex) +
            '<div class="est-wizard-nav">' +
                '<button type="button" class="button button-secondary est-btn-back" data-back-step="1">&larr; Back</button>' +
                '<button type="button" class="button button-primary est-btn-next" data-next-step="3">Contact &rarr;</button>' +
            '</div>' +
        '</div>' +
        // Panel 3: Reply preference + contact fields + submit
        '<div class="est-wizard-panel" data-wizard-step="3">' +
            buildPillField(formId, "contact", contactIndex) +
            '<div class="estimator-section estimator-section-contact">' +
                '<div class="estimator-section-heading">' +
                    '<span>Your contact info</span>' +
                    '<p>Name and phone or email so the team can send a firm quote.</p>' +
                "</div>" +
                '<div class="field-row">' +
                    '<div class="field"><label for="' + formId + '-name">Name</label><input id="' + formId + '-name" name="name" type="text" placeholder="First and last name" autocomplete="name" value="' + escapeHtml(prefill.name) + '" required></div>' +
                    '<div class="field"><label for="' + formId + '-phone">Phone</label><input id="' + formId + '-phone" name="phone" type="tel" placeholder="Best number" autocomplete="tel" value="' + escapeHtml(prefill.phone) + '"></div>' +
                "</div>" +
                '<div class="field">' +
                    '<label for="' + formId + '-email">Email <span class="optional-label">(optional)</span></label>' +
                    '<input id="' + formId + '-email" name="email" type="email" placeholder="Best email address" autocomplete="email" value="' + escapeHtml(prefill.email) + '">' +
                "</div>" +
            "</div>" +
            '<div class="est-wizard-nav">' +
                '<button type="button" class="button button-secondary est-btn-back" data-back-step="2">&larr; Back</button>' +
                '<button class="button button-primary estimator-submit" type="submit">Get My Estimate</button>' +
            '</div>' +
        '</div>' +
        '<p class="quote-note" aria-live="polite"></p>' +
        '<div class="estimate-output" hidden>' +
            '<p class="estimate-kicker">Your ballpark range</p>' +
            '<h3 class="estimate-price"></h3>' +
            '<p class="estimate-summary"></p>' +
            '<ul class="estimate-list"></ul>' +
        "</div>" +
        '<div class="quote-actions">' +
            '<a class="button button-primary quote-preference-link" href="' + OFFICE_SMS + '">Send My Request</a>' +
            '<a class="button button-secondary" href="' + OFFICE_CALL + '">Call Now</a>' +
        "</div>";
}

function computeAddonTotal(form) {
    var total = 0;
    form.querySelectorAll(".est-addon-item input[type='checkbox']:checked").forEach(function (cb) {
        total += Number(cb.dataset.price) || 0;
    });
    return total;
}

function updateLivePrice(form) {
    const serviceStep = getScaleStep("service", getFormValue(form, "serviceLevel") || "0");
    const sizeStep = getScaleStep("size", getFormValue(form, "sizeLevel") || "1");
    const conditionStep = getScaleStep("condition", getFormValue(form, "conditionLevel") || "1");

    if (!serviceStep || !sizeStep || !conditionStep) {
        return;
    }

    const estimate = buildEstimate(serviceStep.value, sizeStep.key || sizeStep.value.toLowerCase(), conditionStep.value);
    const addonTotal = computeAddonTotal(form);
    const low = roundToTwentyFive(estimate.low + addonTotal);
    const high = roundToTwentyFive(estimate.high + addonTotal);
    const rangeNode = form.querySelector(".est-live-range");

    if (rangeNode) {
        rangeNode.textContent = formatMoney(low) + " \u2013 " + formatMoney(high);
        rangeNode.classList.add("is-active");
    }
}

function showServiceAddons(form, serviceName) {
    form.querySelectorAll(".est-addon-group").forEach(function (group) {
        group.hidden = group.dataset.forService !== serviceName;
    });
    const emptyNote = form.querySelector(".est-addons-empty");
    if (emptyNote) {
        emptyNote.hidden = !!SERVICE_ADDONS[serviceName];
    }
    form.querySelectorAll(".est-addon-item input[type='checkbox']").forEach(function (cb) {
        cb.checked = false;
    });
}

function initEstimatorInteractions(form) {
    form.addEventListener("click", function (event) {
        // Wizard navigation
        const nextBtn = event.target.closest(".est-btn-next");
        if (nextBtn) {
            goToWizardStep(form, Number(nextBtn.dataset.nextStep));
            return;
        }
        const backBtn = event.target.closest(".est-btn-back");
        if (backBtn) {
            goToWizardStep(form, Number(backBtn.dataset.backStep));
            return;
        }
        const progressBtn = event.target.closest(".est-progress-step");
        if (progressBtn) {
            goToWizardStep(form, Number(progressBtn.dataset.gotoStep));
            return;
        }

        // Card / pill selection
        const btn = event.target.closest(".est-card, .est-pill");
        if (!btn) { return; }

        const fieldName = btn.dataset.field;
        const indexVal = btn.dataset.index;
        if (!fieldName || indexVal === undefined) { return; }

        const container = btn.closest(".est-cards, .est-pills");
        if (container) {
            container.querySelectorAll(".est-card, .est-pill").forEach(function (b) {
                b.classList.remove("is-active");
            });
        }
        btn.classList.add("is-active");

        const hiddenInput = form.querySelector("[name='" + fieldName + "']");
        if (hiddenInput) {
            hiddenInput.value = indexVal;
        }

        if (fieldName === "serviceLevel") {
            const step = getScaleStep("service", indexVal);
            if (step) { showServiceAddons(form, step.value); }
        }

        updateLivePrice(form);
    });

    form.addEventListener("change", function (event) {
        if (event.target.closest(".est-addon-item")) {
            updateLivePrice(form);
        }
    });

    const defaultServiceStep = getScaleStep("service", getFormValue(form, "serviceLevel") || "0");
    if (defaultServiceStep) {
        showServiceAddons(form, defaultServiceStep.value);
    }

    updateLivePrice(form);
}

document.querySelectorAll(".quote-form[data-estimator='full']").forEach(function (form, index) {
    renderEstimatorForm(form, index);
    initEstimatorInteractions(form);
});

function syncSliderUI(input, previewIndex) {
    const field = input.closest(".slider-field");
    const scale = input.dataset.scale;
    const activeIndex = Number(input.value);
    const displayIndex = Number.isFinite(previewIndex) ? previewIndex : activeIndex;
    const step = getScaleStep(scale, displayIndex);

    if (!field || !step) {
        return;
    }

    const valueNode = field.querySelector(".slider-value");
    const titleNode = field.querySelector(".slider-help-title");
    const copyNode = field.querySelector(".slider-help-copy");

    if (valueNode) {
        valueNode.textContent = step.helpTitle;
    }

    if (titleNode) {
        titleNode.textContent = step.helpTitle;
    }

    if (copyNode) {
        copyNode.textContent = step.helpText;
    }

    field.querySelectorAll(".slider-point").forEach(function (point, index) {
        point.classList.toggle("is-active", index === activeIndex);
        point.classList.toggle("is-preview", Number.isFinite(previewIndex) && index === previewIndex && previewIndex !== activeIndex);
    });
}

document.querySelectorAll(".slider-input").forEach(function (input) {
    syncSliderUI(input);

    input.addEventListener("input", function () {
        syncSliderUI(input);
    });

    const field = input.closest(".slider-field");

    if (!field) {
        return;
    }

    field.querySelectorAll(".slider-point").forEach(function (point) {
        const previewIndex = Number(point.dataset.index);
        const commitSelection = function () {
            input.value = String(previewIndex);
            syncSliderUI(input);
            input.dispatchEvent(new Event("input", { bubbles: true }));
        };

        point.addEventListener("mouseenter", function () {
            syncSliderUI(input, previewIndex);
        });

        point.addEventListener("focus", function () {
            syncSliderUI(input, previewIndex);
        });

        point.addEventListener("mouseleave", function () {
            syncSliderUI(input);
        });

        point.addEventListener("blur", function () {
            syncSliderUI(input);
        });

        point.addEventListener("pointerdown", function (event) {
            event.preventDefault();
            commitSelection();
        });

        point.addEventListener("click", function (event) {
            event.preventDefault();
            commitSelection();
        });
    });
});

function fillEstimateOutput(form, priceText, summary, bullets) {
    const output = form.querySelector(".estimate-output");
    const price = form.querySelector(".estimate-price");
    const summaryNode = form.querySelector(".estimate-summary");
    const list = form.querySelector(".estimate-list");

    if (!output || !price || !summaryNode || !list) {
        return false;
    }

    price.textContent = priceText;
    summaryNode.textContent = summary;
    list.textContent = "";

    bullets.forEach(function (bullet) {
        const item = document.createElement("li");
        item.textContent = bullet;
        list.appendChild(item);
    });

    output.hidden = false;
    output.classList.add("is-visible");
    return true;
}

function setPreferredContactAction(form, contactStep, draft, subjectLine) {
    const actionLink = form.querySelector(".quote-preference-link");

    if (!actionLink || !contactStep) {
        return;
    }

    if (contactStep.value === "Email") {
        actionLink.href = "mailto:" + OFFICE_EMAIL + "?subject=" + encodeURIComponent(subjectLine) + "&body=" + encodeURIComponent(draft);
        actionLink.textContent = "Request An Email Reply";
        return;
    }

    actionLink.href = OFFICE_SMS + "?body=" + encodeURIComponent(draft);
    actionLink.textContent = contactStep.value === "Call" ? "Request A Call Back" : "Request A Text Back";
}

document.querySelectorAll(".quote-form").forEach(function (form) {
    const note = form.querySelector(".quote-note");
    const actionBox = form.querySelector(".quote-actions");
    const textLink = form.querySelector(".quote-text-link");

    ["name", "phone", "email"].forEach(function (fieldName) {
        const field = form.querySelector("[name='" + fieldName + "']");

        if (!field) {
            return;
        }

        field.addEventListener("change", function () {
            saveEstimatorPrefill({
                name: getFormValue(form, "name"),
                phone: getFormValue(form, "phone"),
                email: getFormValue(form, "email"),
                service: form.dataset.estimator === "full"
                    ? getScaleStep("service", getFormValue(form, "serviceLevel") || "0")?.value || ""
                    : getFormValue(form, "service"),
                city: getFormValue(form, "city"),
                timeline: form.dataset.estimator === "full"
                    ? getScaleStep("timeline", getFormValue(form, "timelineLevel") || "1")?.value || ""
                    : getSliderLabel("timeline", getFormValue(form, "timelineLevel") || "1")
            });
        });
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (form.dataset.estimator === "full") {
            const name = getFormValue(form, "name");
            const phone = getFormValue(form, "phone");
            const email = getFormValue(form, "email");
            const serviceStep = getScaleStep("service", getFormValue(form, "serviceLevel") || "0");
            const areaStep = getScaleStep("area", getFormValue(form, "areaLevel") || "0");
            const sizeStep = getScaleStep("size", getFormValue(form, "sizeLevel") || "1");
            const conditionStep = getScaleStep("condition", getFormValue(form, "conditionLevel") || "1");
            const timelineStep = getScaleStep("timeline", getFormValue(form, "timelineLevel") || "1");
            const contactStep = getScaleStep("contact", getFormValue(form, "contactLevel") || "0");

            if (!name || (!phone && !email)) {
                if (note) {
                    note.textContent = "Please add your name and either a phone number or an email so the team can reach you.";
                }

                if (actionBox) {
                    actionBox.classList.remove("is-visible");
                }
                return;
            }

            const estimate = buildEstimate(serviceStep.value, sizeStep.key, conditionStep.value);
            const addonTotal = computeAddonTotal(form);
            const selectedAddons = [];
            form.querySelectorAll(".est-addon-item input[type='checkbox']:checked").forEach(function (cb) {
                const nameEl = cb.closest(".est-addon-item") ? cb.closest(".est-addon-item").querySelector(".est-addon-name") : null;
                if (nameEl) { selectedAddons.push(nameEl.textContent.trim()); }
            });
            const adjLow = roundToTwentyFive(estimate.low + addonTotal);
            const adjHigh = roundToTwentyFive(estimate.high + addonTotal);
            const priceText = formatMoney(adjLow) + " \u2013 " + formatMoney(adjHigh);
            const summary = "A realistic starting range for " + (serviceStep.summaryLabel || serviceStep.value.toLowerCase()) + " in the " + areaStep.value + " is " + priceText + ". Our team can tighten that once we know the exact property and surfaces involved.";
            const bullets = [
                serviceStep.helpText,
                sizeStep.helpText,
                conditionStep.helpText,
                timelineStep.helpText,
                "Reply preference: " + contactStep.label + ". " + contactStep.helpText
            ];

            if (estimate.config.guarantee) {
                bullets.push(estimate.config.guarantee);
            }

            if (selectedAddons.length > 0) {
                bullets.push("Add-ons requested: " + selectedAddons.join(", ") + ".");
            }

            const draftParts = [
                "Hi Clean Surface, I'm " + name + ".",
                "I'm looking for " + (serviceStep.requestLabel || serviceStep.value.toLowerCase()) + ".",
                "The property is in the " + areaStep.value + ".",
                "Job size: " + sizeStep.value + ".",
                "Current condition: " + conditionStep.value + ".",
                "Timeline: " + timelineStep.value + ".",
                "Please reply by " + contactStep.value.toLowerCase() + ".",
                "The website ballpark range showed " + priceText + "."
            ];

            if (phone) {
                draftParts.push("Best phone: " + phone + ".");
            }

            if (email) {
                draftParts.push("Best email: " + email + ".");
            }

            if (selectedAddons.length > 0) {
                draftParts.push("Add-ons: " + selectedAddons.join(", ") + ".");
            }

            const draft = draftParts.join(" ");
            const replyLabel = contactStep.value === "Email"
                ? "email reply"
                : contactStep.value === "Call"
                    ? "call back"
                    : "text back";

            saveEstimatorPrefill({
                name: name,
                phone: phone,
                email: email,
                service: serviceStep.value,
                city: areaStep.value,
                timeline: timelineStep.value
            });

            setPreferredContactAction(form, contactStep, draft, "Quote request for " + serviceStep.value);

            let copied = false;

            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(draft);
                    copied = true;
                } catch (error) {
                    copied = false;
                }
            }

            fillEstimateOutput(form, priceText, summary, bullets);

            // Collapse wizard after submit
            form.querySelectorAll(".est-wizard-panel").forEach(function (p) { p.classList.remove("is-active"); });
            const progressNav = form.querySelector(".est-progress");
            if (progressNav) { progressNav.hidden = true; }

            if (note) {
                note.textContent = copied
                    ? "Your request is ready. The details were copied, and the button below is set for a " + replyLabel + "."
                    : "Your estimate is ready. Use the button below to request a " + replyLabel + " from the team.";
            }

            if (actionBox) {
                actionBox.classList.add("is-visible");
            }

            return;
        }

        const name = getFormValue(form, "name");
        const phone = getFormValue(form, "phone");
        const city = getFormValue(form, "city");
        const service = getFormValue(form, "service");
        const size = getFormValue(form, "size") || "Medium";
        const condition = getSliderLabel("condition", getFormValue(form, "conditionLevel") || "1");
        const timeline = getSliderLabel("timeline", getFormValue(form, "timelineLevel") || "1");
        const details = getFormValue(form, "details");

        if (!name || !city || !service) {
            if (note) {
                note.textContent = "Please add your name, city, and service so the team can build the estimate.";
            }

            if (actionBox) {
                actionBox.classList.remove("is-visible");
            }
            return;
        }

        const estimate = buildEstimate(service, size.toLowerCase(), condition);
        const priceText = formatMoney(estimate.low) + " - " + formatMoney(estimate.high);
        const summary = "A realistic starting range for " + service.toLowerCase() + " in " + city + " is " + priceText + ". Final pricing depends on square footage, access, stain type, and any prep work needed on site.";
        const bullets = [
            estimate.config.approach,
            "Selected job profile: " + size + " | " + condition + ".",
            "Adding the address and square footage, if you know it, helps the team tighten the range faster.",
            timeline === "This week"
                ? "If timing is tight, include any HOA deadline or move-in date in the message so the team can prioritize the callback."
                : timeline === "Flexible"
                    ? "Flexible timing helps when you want the best schedule fit or plan to bundle multiple surfaces together."
                    : "This is the most common timeline and usually gives enough room to match the right crew and cleaning method."
        ];

        if (estimate.config.guarantee) {
            bullets.push(estimate.config.guarantee);
        }

        const draftParts = [
            "Hi Clean Surface, I'm " + name + ".",
            "I'm in " + city + " and I need a quote for " + service + ".",
            "Job size: " + size + ".",
            "Condition: " + condition + ".",
            "Timeline: " + timeline + "."
        ];

        if (phone) {
            draftParts.push("Best phone: " + phone + ".");
        }

        if (details) {
            draftParts.push("Notes: " + details + ".");
        }

        draftParts.push("The website ballpark range showed " + priceText + ".");

        const draft = draftParts.join(" ");

        saveEstimatorPrefill({
            name: name,
            phone: phone,
            email: getFormValue(form, "email"),
            service: service,
            city: city,
            timeline: timeline
        });

        if (textLink) {
            textLink.href = OFFICE_SMS + "?body=" + encodeURIComponent(draft);
        }

        let copied = false;

        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(draft);
                copied = true;
            } catch (error) {
                copied = false;
            }
        }

        fillEstimateOutput(form, priceText, summary, bullets);

        if (note) {
            note.textContent = copied
                ? "Your message is ready and the estimate details were copied."
        : "Your estimate is ready. Use Text Us or Call Now.";
        }

        if (actionBox) {
            actionBox.classList.add("is-visible");
        }
    });
});

document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-ba]").forEach(function (wrap) {
    const range = wrap.querySelector(".ba-range");
    const afterWrap = wrap.querySelector(".ba-after-wrap");

    if (!range || !afterWrap) {
        return;
    }

    function sync() {
        const value = Number(range.value || 50);
        afterWrap.style.width = value + "%";
        wrap.style.setProperty("--ba-line-pos", value + "%");
    }

    range.addEventListener("input", sync);
    sync();
});

var scrollTopButton = document.getElementById("scrollTopBtn");

if (!scrollTopButton) {
    scrollTopButton = document.createElement("button");
    scrollTopButton.type = "button";
    scrollTopButton.id = "scrollTopBtn";
    scrollTopButton.className = "scroll-top";
    scrollTopButton.setAttribute("aria-label", "Scroll to top");
    scrollTopButton.textContent = "↑";
    document.body.appendChild(scrollTopButton);
}

window.addEventListener("scroll", function () {
    if (window.scrollY > 320) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }
});

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mark current nav link
(function () {
    var path = window.location.pathname.replace(/\/?$/, "/");
    document.querySelectorAll(".menu a").forEach(function (link) {
        var href = link.getAttribute("href");
        if (!href || link.classList.contains("button")) return;
        var normalized = href.replace(/\/?$/, "/");
        if (normalized === path) {
            link.setAttribute("aria-current", "page");
        }
    });
}());
