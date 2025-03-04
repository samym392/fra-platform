import { TableNames } from '@meta/assessment'

export const entries = [
  {
    tableName: TableNames.extentOfForest,
    variables: [
      {
        variableName: 'forestArea',
        csvColumn: '1a_forestArea',
      },
      {
        variableName: 'otherWoodedLand',
        csvColumn: '1a_otherWoodedLand',
      },
      {
        variableName: 'totalLandArea',
        csvColumn: '1a_landArea',
      },
    ],
  },
  {
    tableName: TableNames.forestCharacteristics,
    variables: [
      {
        variableName: 'naturalForestArea',
        csvColumn: '1b_naturallyRegeneratingForest',
      },
      {
        variableName: 'plantedForest',
        csvColumn: '1b_plantedForest',
      },
      {
        variableName: 'plantationForestArea',
        csvColumn: '1b_plantationForest',
      },
      {
        variableName: 'plantationForestIntroducedArea',
        csvColumn: '1b_plantationForestIntroduced',
      },
      {
        variableName: 'otherPlantedForestArea',
        csvColumn: '1b_otherPlantedForest',
      },
    ],
  },
  {
    tableName: 'specificforestcategories',
    variables: [
      {
        variableName: 'primary_forest',
        csvColumn: '1c_primary',
      },
      {
        variableName: 'temporarily_unstocked',
        csvColumn: '1c_tempUnstocked',
      },
      {
        variableName: 'bamboo',
        csvColumn: '1c_bamboos',
      },
      {
        variableName: 'mangroves',
        csvColumn: '1c_mangroves',
      },
      {
        variableName: 'rubber_wood',
        csvColumn: '1c_rubber',
      },
    ],
  },
  {
    tableName: 'otherlandwithtreecover',
    variables: [
      {
        variableName: 'palms',
        csvColumn: '1f_palms',
      },
      {
        variableName: 'tree_orchards',
        csvColumn: '1f_treeOrchards',
      },
      {
        variableName: 'agroforestry',
        csvColumn: '1f_agroforestry',
      },
      {
        variableName: 'other',
        csvColumn: '1f_other',
      },
      {
        variableName: 'trees_in_urban_settings',
        csvColumn: '1f_treesUrbanSettings',
      },
    ],
  },
  {
    tableName: 'growingstockavg',
    variables: [
      {
        variableName: 'naturallyRegeneratingForest',
        csvColumn: '2a_gs_ha_nat_reg',
      },
      {
        variableName: 'forest',
        csvColumn: '2a_gs_ha_forest',
      },
      {
        variableName: 'plantationForest',
        csvColumn: '2a_gs_ha_plantation',
      },
      {
        variableName: 'plantedForest',
        csvColumn: '2a_gs_ha_planted',
      },
      {
        variableName: 'otherWoodedLand',
        csvColumn: '2a_gs_ha_owl',
      },
      {
        variableName: 'otherPlantedForest',
        csvColumn: '2a_gs_ha_other_planted',
      },
    ],
  },
  {
    tableName: 'growingstocktotal',
    variables: [
      {
        variableName: 'naturallyRegeneratingForest',
        csvColumn: '2a_gs_tot_nat_reg',
      },
      {
        variableName: 'plantedForest',
        csvColumn: '2a_gs_tot_planted',
      },
      {
        variableName: 'plantationForest',
        csvColumn: '2a_gs_tot_plantation',
      },
      {
        variableName: 'otherPlantedForest',
        csvColumn: '2a_gs_tot_other_planted',
      },
      {
        variableName: 'forest',
        csvColumn: '2a_gs_tot_forest',
      },
      {
        variableName: 'otherWoodedLand',
        csvColumn: '2a_gs_tot_owl',
      },
    ],
  },
  {
    tableName: 'growingstockcomposition',
    variables: [
      {
        variableName: 'native_rank1',
        csvColumn: '2b_native_#1',
      },
      {
        variableName: 'native_rank2',
        csvColumn: '2b_native_#2',
      },
      {
        variableName: 'native_rank3',
        csvColumn: '2b_native_#3',
      },
      {
        variableName: 'native_rank4',
        csvColumn: '2b_native_#4',
      },
      {
        variableName: 'native_rank5',
        csvColumn: '2b_native_#5',
      },
      {
        variableName: 'native_rank6',
        csvColumn: '2b_native_#6',
      },
      {
        variableName: 'native_rank7',
        csvColumn: '2b_native_#7',
      },
      {
        variableName: 'native_rank8',
        csvColumn: '2b_native_#8',
      },
      {
        variableName: 'native_rank9',
        csvColumn: '2b_native_#9',
      },
      {
        variableName: 'native_rank10',
        csvColumn: '2b_native_#10',
      },
      {
        variableName: 'remaining_native',
        csvColumn: '2b_native_remaining',
      },
      {
        variableName: 'total_native_placeholder',
        csvColumn: '2b_native_total',
      },
      {
        variableName: 'introduced_rank1',
        csvColumn: '2b_introduced_#1',
      },
      {
        variableName: 'introduced_rank2',
        csvColumn: '2b_introduced_#2',
      },
      {
        variableName: 'introduced_rank3',
        csvColumn: '2b_introduced_#3',
      },
      {
        variableName: 'introduced_rank4',
        csvColumn: '2b_introduced_#4',
      },
      {
        variableName: 'introduced_rank5',
        csvColumn: '2b_introduced_#5',
      },
      {
        variableName: 'remaining_introduced_placeholder',
        csvColumn: '2b_introduced_remaining',
      },
      {
        variableName: 'totalIntroduced',
        csvColumn: '2b_introduced_total',
      },
      {
        variableName: 'totalGrowingStock',
        csvColumn: '2b_total_gs',
      },
    ],
  },
  {
    tableName: 'biomassstock',
    variables: [
      {
        variableName: 'forest_above_ground',
        csvColumn: '2c_agb',
      },
      {
        variableName: 'forest_below_ground',
        csvColumn: '2c_bgb',
      },
      {
        variableName: 'forest_deadwood',
        csvColumn: '2c_dwb',
      },
    ],
  },
  {
    tableName: 'carbonstock',
    variables: [
      {
        variableName: 'carbon_forest_above_ground',
        csvColumn: '2d_carbon_agb',
      },
      {
        variableName: 'carbon_forest_below_ground',
        csvColumn: '2d_carbon_bgb',
      },
      {
        variableName: 'carbon_forest_deadwood',
        csvColumn: '2d_carbon_dw',
      },
      {
        variableName: 'carbon_forest_litter',
        csvColumn: '2d_carbon_litter',
      },
      {
        variableName: 'carbon_forest_soil',
        csvColumn: '2d_carbon_soil',
      },
    ],
  },
  {
    tableName: 'carbonstocksoildepth',
    variables: [
      {
        variableName: 'soil_depth',
        csvColumn: '2d_soil_depth_cm',
      },
    ],
  },
  {
    tableName: 'primarydesignatedmanagementobjective',
    variables: [
      {
        variableName: 'production',
        csvColumn: '3a_prim_prod',
      },
      {
        variableName: 'protection_of_soil_and_water',
        csvColumn: '3a_prim_prot',
      },
      {
        variableName: 'conservation_of_biodiversity',
        csvColumn: '3a_prim_biodiv',
      },
      {
        variableName: 'social_services',
        csvColumn: '3a_prim_socserv',
      },
      {
        variableName: 'multiple_use',
        csvColumn: '3a_prim_multi',
      },
      {
        variableName: 'other',
        csvColumn: '3a_prim_other',
      },
      {
        variableName: 'no_unknown',
        csvColumn: '3a_prim_no_unknown',
      },
    ],
  },
  {
    tableName: 'totalareawithdesignatedmanagementobjective',
    variables: [
      {
        variableName: 'production',
        csvColumn: '3a_tot_prod',
      },
      {
        variableName: 'protection_of_soil_and_water',
        csvColumn: '3a_tot_prot',
      },
      {
        variableName: 'conservation_of_biodiversity',
        csvColumn: '3a_tot_biodiv',
      },
      {
        variableName: 'social_services',
        csvColumn: '3a_tot_socserv',
      },
      {
        variableName: 'other',
        csvColumn: '3a_tot_other',
      },
    ],
  },
  {
    tableName: 'forestAreaWithinProtectedAreas',
    variables: [
      {
        variableName: 'forest_area_within_protected_areas',
        csvColumn: '3b_protected',
      },
      {
        variableName: 'forest_area_with_long_term_management_plan',
        csvColumn: '3b_forMngt',
      },
      {
        variableName: 'of_which_in_protected_areas',
        csvColumn: '3b_mngtProt',
      },
    ],
  },
  {
    tableName: 'forestOwnership',
    variables: [
      {
        variableName: 'private_ownership',
        csvColumn: '4a_priv_own',
      },
      {
        variableName: 'of_which_by_individuals',
        csvColumn: '4a_individ',
      },
      {
        variableName: 'of_which_by_private_businesses',
        csvColumn: '4a_bus_inst_fo',
      },
      {
        variableName: 'of_which_by_communities',
        csvColumn: '4a_indigenous_fo',
      },
      {
        variableName: 'public_ownership',
        csvColumn: '4a_pub_own',
      },
      {
        variableName: 'other_or_unknown',
        csvColumn: '4a_fo_unknown',
      },
    ],
  },
  {
    tableName: 'holderofmanagementrights',
    variables: [
      {
        variableName: 'public_administration',
        csvColumn: '4b_pub_admin',
      },
      {
        variableName: 'individuals',
        csvColumn: '4b_individuals',
      },
      {
        variableName: 'private_businesses',
        csvColumn: '4b_bus_inst_mr',
      },
      {
        variableName: 'communities',
        csvColumn: '4b_indigenous_mr',
      },
      {
        variableName: 'other',
        csvColumn: '4b_unknown',
      },
    ],
  },
  {
    tableName: 'degradedforest',
    variables: [
      {
        variableName: 'does_country_monitor',
        csvColumn: '5c_y_n',
      },
    ],
  },
  {
    tableName: 'forestpolicy',
    variables: [
      {
        variableName: 'national_policies_supporting_SFM',
        csvColumn: '6a_policies_national',
      },
      {
        variableName: 'sub_national_policies_supporting_SFM',
        csvColumn: '6a_policies_sub_national',
      },
      {
        variableName: 'national_legislations_supporting_SFM',
        csvColumn: '6a_legislation_national',
      },
      {
        variableName: 'sub_national_legislations_supporting_SFM',
        csvColumn: '6a_legislation_sub_national',
      },
      {
        variableName: 'national_platform_for_stakeholder_participation',
        csvColumn: '6a_platform_national',
      },
      {
        variableName: 'sub_national_platform_for_stakeholder_participation',
        csvColumn: '6a_platform_sub_national',
      },
      {
        variableName: 'national_existence_of_traceability_system',
        csvColumn: '6a_traceability_national',
      },
      {
        variableName: 'sub_national_existence_of_traceability_system',
        csvColumn: '6a_traceability_sub_national',
      },
    ],
  },
  {
    tableName: 'areaofpermanentforestestate',
    variables: [
      {
        variableName: 'applicable',
        csvColumn: '6b_pfe_y_n',
      },
      {
        variableName: 'area_of_permanent_forest_estate',
        csvColumn: '6b_pfe_area',
      },
    ],
  },
  {
    tableName: 'graduationofstudents',
    variables: [
      {
        variableName: 'doctoral_degree',
        csvColumn: '7b_phd',
      },

      {
        variableName: 'masters_degree',
        csvColumn: '7b_msc',
      },

      {
        variableName: 'bachelors_degree',
        csvColumn: '7b_ba',
      },

      {
        variableName: 'technician_certificate',
        csvColumn: '7b_tech',
      },

      {
        variableName: 'total',
        csvColumn: '7b_total',
      },
    ],
  },
  {
    tableName: 'employment',
    variables: [
      {
        variableName: 'employment_in_forestry_and_logging',
        csvColumn: '7a_employment',
      },
      {
        variableName: 'of_which_silviculture_and_other_forestry_activities',
        csvColumn: '7a_emp_forestry',
      },
      {
        variableName: 'of_which_logging',
        csvColumn: '7a_emp_logging',
      },
      {
        variableName: 'of_which_gathering_of_non_wood_forest_products',
        csvColumn: '7a_emp_nwfp',
      },
      {
        variableName: 'of_which_support_services_to_forestry',
        csvColumn: '7a_emp_support',
      },
    ],
  },
]
