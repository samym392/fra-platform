export const translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },
  definition: {
    linkLabel: 'See definitions'
  },

  user: {
    roles: {
      reviewer: 'Reviewer',
      nationalCorrespondent: 'National Correspondent',
      national_correspondent: 'National Correspondent',
      reviewer_all: 'Reviewer',
      national_correspondent_all: 'National Correspondent',
      noRole: 'N/A'
    }
  },

  fraClass: {
    forest: 'Forest',
    otherWoodedLand: 'Other wooded land',
    otherLand: 'Other land'
  },
  fraForestCharacteristicsClass: {
    naturallyGenerated: 'Naturally regenerated',
    plantationForest: 'Plantation forest',
    otherPlantedForest: 'Other planted forest',
    introduced: '...of which introduces species'
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified: 'Error: User {{user}} tried to access {{countryIso}} but no role has been specified',
      countryUserNotReviewer: 'Error: User {{user}} tried to access {{countryIso}} of which is not reviewer'
    },
    assessment: {
      transitionNotAllowed: 'Error: Transition from {{currentStatus}} to {{status}} is not allowed for role {{role}}'
    },
    review: {
      commentDeleteNotOwner: 'Error: User {{user}} tried to delete a comment that doesn\'t own',
      commentEnterResolvedIssue: 'Error: User {{user}} tried to enter a comment for a resolved issue'
    },
    ndp: {
      previousNdpNotFound: 'Unable to find any National data point prior to {{year}}'
    }
  },
  // components

  countryListing: {
    annuallyReported: 'Annually',
    fiveYearCycle: 'Five-year'
  },

  navigation: {
    annuallyReported: 'Annually reported',
    fiveYearCycle: 'Five-year cycle',
    assessmentStatus: {
      changing: {
        label: 'Changing…'
      },
      review: {
        label: 'In review',
        next: 'Send to review',
        previous: 'Return to review'
      },
      accepted: {
        label: 'Accepted',
        next: 'Accept',
        previous: ''
      },
      editing: {
        label: 'Editing',
        previous: 'Return to editing'
      }
    }
  },

  footer: {
    logout: 'Logout',
    autoSave: {
      saving: 'Saving…'
    }
  },

  review: {
    comments: 'Comments',
    noComments: 'No comments',
    resolve: 'Resolve',
    commentTime: {
      hour: '{{count}} hour ago',
      hour_plural: '{{count}} hours ago',
      day: '{{count}} day ago',
      day_plural: '{{count}} days ago',
      week: '{{count}} week ago',
      week_plural: '{{count}} weeks ago',
      aMomentAgo: 'A moment ago'
    },
    confirmDelete: 'Are you sure you want to delete this comment? This cannot be undone.',
    commentDeleted: 'Comment deleted',
    commentMarkedAsResolved: 'Marked as resolved',
    delete: 'Delete',
    writeComment: 'Write a comment…',
    commentingClosed: 'Commenting closed',
    add: 'Add',
    cancel: 'Cancel'
  },

  description: {
    description: 'Description',
    dataSources: 'Data Sources',
    originalData: 'Original data',
    nationalClassificationAndDefinitions: 'National classification and definitions',
  },

  nationalDataPoint: {
    nationalDataPoint: 'National data point',
    addNationalDataPoint: 'Add national data point',
    noNationalDataAdded: 'No national data added',
    nationalData: 'National data',
    year: 'Year',
    methods: 'Methods',
    edit: 'Edit',
    copyPreviousValues: 'Copy previous values',
    nationalClass: 'National class',
    nationalClasses: 'National classes',
    definition: 'Definition',
    fraClasses: 'FRA classes',
    class: 'Class',
    area: 'Area',
    total: 'Total',
    delete: 'Delete',
    cancel: 'Cancel',
    saveData: 'Save data',
    enterOrCopyPasteNationalClasses: 'Enter or copy and paste national classes'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Extent of forest',
    generateFraValues: 'Generate FRA values',
    extentOfForestValues: 'Extent of forest values',
    forestArea: 'Forest area',
    chart: {
      noDataPlaceholderLine1: 'To get started, add new national data points and use',
      noDataPlaceholderLine2: 'them to generate FRA values automatically.'
    }
  },


  growingStock: {
    growingStock: 'Growing stock'
  },

  biomassStock: {
    biomassStock: 'Biomass stock'
  },

  carbonStock: {
    carbonStock: 'Carbon stock'
  },

  protectedAreas: {
    protectedAreasLongTermMgmtPlans: 'Protected areas and long-term management plans'
  },

  // five year cycle assessment components

  forestAreaChange: {
    forestAreaLossGainChange: 'Forest area loss, gain and net change',
    forestExpansion: 'Forest expansion (a)',
    ofWhichAfforestation: '…of which afforestation',
    ofWhichNaturalExpansion: '…of which natural expansion',
    deforestation: 'Deforestation (b)',
    forestAreaNetChange: 'Forest area net change'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Forest Characteristics',
    forestCharacteristicsValues: 'Forest Characteristics values',
    naturalForestArea: 'Naturally regenerated forest',
    naturalForestPrimaryArea: '…of which primary',
    plantationForestArea: 'Plantation forest',
    plantationForestIntroducedArea: '…of which introduced species',
    otherPlantedForestArea: 'Other planted forest'
  },

  specificForestCategories: {
    specificForestCategories: 'Specific forest categories',
    bamboo: 'Bamboo',
    mangroves: 'Mangroves',
    rubberPlantations: 'Rubber plantations'
  },

  growingStockComposition: {
    growingStockComposition: 'Growing stock composition'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Non wood forest products'
  },

  primaryDesignatedManagementObjective: {
    primaryDesignatedManagementObjective: 'Primary designated management objective',
    production: 'Production',
    soilWaterProtection: 'Protection of soil and water',
    biodiversityConservation: 'Conservation of biodiversity',
    socialServices: 'Social Services',
    multipleUse: 'Multiple use',
    other: 'Other',
    unknown: 'No/unknown',
    totalForestArea: 'Total forest area'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Forest ownership and management rights'
  },

  disturbances: {
    disturbances: 'Disturbances'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Area affected by fire',
    totalLandAreaAffectedByFire: 'Total land area affected by fire',
    ofWhichForest: '…of which on forest'
  },

  employment: {
    employment: 'Employment'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Graduation of students'
  },

  policiesAndLegislation: {
    policiesAndLegislation: 'Policies and legislation'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Area of permanent forest estate'
  }

}
