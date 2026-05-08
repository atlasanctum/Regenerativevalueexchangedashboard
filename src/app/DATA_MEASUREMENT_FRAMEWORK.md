# RVE Data & Measurement Engineering Framework
## Sacred Data: Building Credibility Through Verifiable Measurement

**Document Version:** 1.0  
**Framework Owner:** Data & Measurement Engineering Team  
**Date:** March 4, 2026

---

## Executive Summary

**The credibility of regenerative finance depends entirely on the integrity of measurement data.**

If soil carbon claims are inflated by 10%, the entire system collapses. If satellite imagery is misinterpreted, fraudulent projects pass verification. If IoT sensors drift out of calibration, impact calculations become fiction.

This framework establishes **iron-clad data integrity** through:
- **Multi-source triangulation** (satellite + IoT + ground truth)
- **Continuous calibration protocols** (sensor drift detection)
- **Provenance tracking** (immutable data lineage)
- **Automated quality checks** (statistical anomaly detection)
- **Scientific reproducibility** (versioned datasets + methodology)

**Our Standard:** Every measurement must be defensible in a court of law or scientific peer review.

---

## 1. Data Integrity Principles

### The Five Pillars of Sacred Data

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     SACRED DATA PRINCIPLES                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  1. VERIFIABLE                                                           │
│     Every measurement has cryptographic proof of origin                  │
│     └─ Sensor ID + Timestamp + GPS + Hash = Immutable record            │
│                                                                           │
│  2. TRIANGULATED                                                         │
│     No single source of truth - require 3+ independent confirmations    │
│     └─ Satellite + IoT + Ground Survey = Cross-validation               │
│                                                                           │
│  3. CALIBRATED                                                           │
│     Sensors drift - continuous calibration against known standards      │
│     └─ Monthly calibration checks + Automated drift detection           │
│                                                                           │
│  4. PROVENANCE-TRACKED                                                   │
│     Full data lineage from sensor to impact certificate                 │
│     └─ Raw → Processed → Validated → Aggregated (all versioned)         │
│                                                                           │
│  5. SCIENTIFICALLY REPRODUCIBLE                                          │
│     Independent researcher can replicate analysis from archived data    │
│     └─ Versioned datasets + Open methodology + Audit logs               │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Pipeline Architecture

### End-to-End Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     DATA INGESTION LAYER                                 │
└────────────────────────────────────────────���────────────────────────────┘

SOURCE 1: SATELLITE IMAGERY
├─ Provider: Sentinel-2, Landsat 8, Planet Labs
├─ Frequency: 3-16 day revisit
├─ Resolution: 10m-30m multispectral
├─ Data Volume: 50GB/day
└─ Processing Pipeline:
   1. Download raw GeoTIFF from API
   2. Atmospheric correction (Sen2Cor algorithm)
   3. Cloud masking (Fmask algorithm)
   4. NDVI, EVI, SAVI index calculation
   5. Time-series analysis (detect changes)
   6. Store in PostGIS database
   └─ QA Flag: Cloud cover >30% = reject

SOURCE 2: IoT SENSOR NETWORKS
├─ Sensor Types: Soil moisture, pH, NPK, temperature, CO2 flux
├─ Frequency: 15-minute intervals
├─ Data Volume: 10MB/day (all sensors)
├─ Communication: LoRaWAN → Gateway → Cloud
└─ Processing Pipeline:
   1. Receive sensor packet (encrypted)
   2. Decrypt + verify signature
   3. Validate sensor ID in whitelist
   4. Check calibration status (last calibrated <30 days?)
   5. Anomaly detection (value outside expected range?)
   6. Store in TimescaleDB (time-series optimized)
   └─ QA Flag: Calibration overdue = warning

SOURCE 3: GROUND TRUTH SURVEYS
├─ Data Types: Soil samples, tree counts, water quality tests
├─ Frequency: Monthly or quarterly
├─ Data Volume: 100MB/month (photos + lab reports)
├─ Collection: Mobile app (GPS-tagged photos + forms)
└─ Processing Pipeline:
   1. Upload geotagged photo + metadata
   2. Verify GPS coordinates within project boundary
   3. Extract EXIF data (timestamp, device ID)
   4. OCR lab report PDFs (extract numeric results)
   5. Cross-reference with satellite/IoT data
   6. Store in PostgreSQL + IPFS (photos)
   └─ QA Flag: GPS >500m from project site = reject

SOURCE 4: EXTERNAL DATASETS
├─ Weather: OpenWeather, NOAA
├─ Soil Maps: FAO Harmonized World Soil Database
├─ Land Use: ESA WorldCover
├─ Frequency: Daily to annual
└─ Processing Pipeline:
   1. API fetch or bulk download
   2. Spatial intersection with project areas
   3. Extract relevant variables
   4. Join with internal datasets
   └─ QA Flag: Data source offline = use cached

┌─────────────────────────────────────────────────────────────────────────┐
│                     DATA VALIDATION LAYER                                │
└─────────────────────────────────────────────────────────────────────────┘

VALIDATION RULES ENGINE
├─ Rule 1: Spatial Consistency
│  └─ Soil moisture from IoT should correlate with satellite NDVI
│     If correlation <0.5 → FLAG for review
│
├─ Rule 2: Temporal Consistency
│  └─ Soil carbon can't increase >5% per year naturally
│     If increase >5% → FLAG as suspicious
│
├─ Rule 3: Physical Plausibility
│  └─ pH can't be <0 or >14, soil moisture can't exceed porosity
│     If outside bounds → REJECT as sensor error
│
├─ Rule 4: Cross-Source Triangulation
│  └─ Forest restoration claim requires:
│     - Satellite NDVI increase
│     - Ground survey tree count
│     - IoT soil moisture stability
│     If only 1 of 3 → INSUFFICIENT evidence
│
└─ Rule 5: Statistical Outlier Detection
   └─ Z-score >3 from project's historical mean
      If outlier → FLAG for manual review

AUTOMATED QA DASHBOARD
├─ Daily Report:
│  ├─ Data completeness: 98.7% (target >95%)
│  ├─ Sensor uptime: 94.2% (target >90%)
│  ├─ Validation failures: 23 (investigate)
│  └─ Calibration overdue: 3 sensors (alert)
└─ Alerts:
   ├─ 🔴 CRITICAL: Sensor #247 flatline for 24 hours
   ├─ 🟡 WARNING: Project #89 missing ground truth for 3 months
   └─ 🟢 INFO: Satellite imagery 95% cloud-free this week

┌─────────────────────────────────────────────────────────────────────────┐
│                     DATA TRANSFORMATION LAYER                            │
└─────────────────────────────────────────────────────────────────────────┘

RAW DATA → STANDARDIZED DATA
├─ Coordinate System: All data transformed to WGS84 / EPSG:4326
├─ Units: SI units only (kg/ha, m³, °C, etc.)
├─ Timestamps: UTC ISO 8601 format
└─ Schema: Strictly typed (PostgreSQL + JSON Schema validation)

FEATURE ENGINEERING
├─ Vegetation Indices: NDVI, EVI, SAVI, LAI
├─ Soil Health Score: Composite of organic matter, pH, NPK, moisture
├─ Water Quality Index: Weighted average of pH, turbidity, DO, nitrates
└─ Carbon Sequestration Rate: Time-series regression on soil carbon %

AGGREGATION & ROLLUPS
├─ Temporal: Hourly → Daily → Weekly → Monthly
├─ Spatial: Sensor point → 100m grid → Project boundary → Regional
└─ Impact Metrics:
   ├─ Soil carbon: tonnes CO2e sequestered per hectare
   ├─ Water quality: liters purified per day
   ├─ Biodiversity: species richness index
   └─ Forest cover: hectares restored

┌─────────────────────────────────────────────────────────────────────────┐
│                     DATA STORAGE LAYER                                   │
└─────────────────────────────────────────────────────────────────────────┘

DATABASES
├─ TimescaleDB: IoT sensor time-series (optimized for range queries)
├─ PostGIS: Satellite imagery + spatial analysis
├─ PostgreSQL: Ground truth surveys, metadata, audit logs
└─ Redis: Real-time data cache (last 24 hours)

ARCHIVAL STORAGE
├─ IPFS: Immutable evidence (photos, lab reports)
├─ Arweave: Permanent archival (>30 year guarantee)
└─ S3 Glacier: Cold storage for historical satellite imagery

DATA VERSIONING
├─ Every dataset versioned with hash (Git-like)
├─ Example: soil-carbon-project-89-v1.2.3
│  ├─ v1.0.0: Initial baseline (2024-01-15)
│  ├─ v1.1.0: Added sensor #45 data (2024-06-10)
│  └─ v1.2.3: Recalibrated sensor #23 (2025-03-02)
└─ Reproducibility: Any analysis can be re-run on exact dataset version
```

---

## 3. Measurement Standards & Protocols

### Soil Health Measurement Protocol

```yaml
protocol:
  name: "RVE Soil Health Assessment v2.1"
  status: "Certified by Soil Science Society of America"
  
sampling:
  frequency: "Quarterly (4x per year)"
  depth: "0-30cm topsoil"
  sample_size: "500g composite from 5 subsamples"
  spatial_pattern: "Stratified random sampling"
  
measurements:
  - metric: "Soil Organic Carbon (SOC)"
    method: "Walkley-Black wet oxidation"
    lab_certification: "ISO 17025"
    precision: "±0.1%"
    
  - metric: "pH"
    method: "Glass electrode in 1:2.5 soil:water"
    calibration: "pH 4.0, 7.0, 10.0 buffers"
    precision: "±0.1 pH units"
    
  - metric: "Available Nitrogen (N)"
    method: "Kjeldahl digestion"
    precision: "±5 mg/kg"
    
  - metric: "Soil Moisture"
    method: "Time Domain Reflectometry (TDR)"
    sensor_type: "Campbell Scientific CS616"
    calibration_frequency: "Monthly"
    
quality_control:
  blanks: "1 per 10 samples"
  duplicates: "1 per 10 samples"
  reference_standards: "Certified reference material every batch"
  
chain_of_custody:
  - sample_collection: "GPS-tagged photo + collector signature"
  - transport: "Sealed bag with tamper-evident seal"
  - lab_receipt: "Barcode scan + weight verification"
  - analysis: "Lab technician signature + instrument ID"
  - results: "PDF report + LIMS export to database"
```

### Water Quality Measurement Protocol

```yaml
protocol:
  name: "RVE Water Quality Monitoring v1.8"
  status: "WHO Guidelines for Drinking-water Quality compliant"
  
sampling:
  frequency: "Daily (automated sensors) + Weekly (manual)"
  locations: "Inlet, treatment stages, outlet"
  sample_volume: "1L for lab analysis"
  
measurements:
  - metric: "pH"
    sensor: "Atlas Scientific pH probe"
    range: "0-14 pH"
    accuracy: "±0.02 pH"
    calibration: "7-day auto-calibration with 4.0, 7.0, 10.0 buffers"
    
  - metric: "Turbidity"
    sensor: "HydroScat-6 spectrophotometer"
    range: "0-1000 NTU"
    accuracy: "±2% of reading"
    calibration: "Monthly with formazin standards"
    
  - metric: "Dissolved Oxygen (DO)"
    sensor: "YSI ProODO optical sensor"
    range: "0-20 mg/L"
    accuracy: "±0.1 mg/L"
    calibration: "Bi-weekly with water-saturated air"
    
  - metric: "Flow Rate"
    sensor: "Ultrasonic flow meter"
    range: "0-10 m³/hour"
    accuracy: "±1% of reading"
    calibration: "Quarterly with volumetric tank test"
    
alerts:
  - condition: "pH <6.5 or >8.5"
    action: "Immediate SMS to operator + auto-sampling"
    
  - condition: "Turbidity >5 NTU"
    action: "Flag for manual inspection"
    
  - condition: "Sensor offline >4 hours"
    action: "Engineer dispatch"
```

### Forest Restoration Measurement Protocol

```yaml
protocol:
  name: "RVE Forest Carbon Stock Assessment v3.0"
  status: "Verified Carbon Standard (VCS) certified"
  
remote_sensing:
  satellite:
    - provider: "Sentinel-2"
      bands: ["B2 (Blue)", "B3 (Green)", "B4 (Red)", "B8 (NIR)"]
      resolution: "10m"
      frequency: "5-day revisit"
      
    - provider: "Landsat 8"
      bands: ["OLI multispectral"]
      resolution: "30m"
      frequency: "16-day revisit"
      
  indices:
    - NDVI: "(NIR - Red) / (NIR + Red)"
      threshold_forest: ">0.6"
      
    - EVI: "2.5 * ((NIR - Red) / (NIR + 6*Red - 7.5*Blue + 1))"
      advantage: "Less sensitive to atmospheric conditions"
      
  change_detection:
    algorithm: "LandTrendr (Landsat-based detection)"
    sensitivity: "Detect 10% canopy change"
    
ground_truth:
  sampling:
    design: "Systematic grid with random start"
    plot_size: "20m × 20m (0.04 ha)"
    plots_per_hectare: 3
    
  measurements:
    - metric: "Tree Count"
      method: "Complete census within plot"
      size_threshold: ">5cm DBH (diameter at breast height)"
      
    - metric: "Diameter at Breast Height (DBH)"
      method: "Diameter tape at 1.3m height"
      precision: "±0.1 cm"
      
    - metric: "Tree Height"
      method: "Clinometer (Suunto or laser rangefinder)"
      precision: "±0.5 m"
      
    - metric: "Species Identification"
      method: "Local botanist + iNaturalist photo verification"
      
  biomass_calculation:
    allometric_equation: "Chave et al. (2014) pantropical"
    formula: "AGB = 0.0673 × (ρ × DBH² × H)^0.976"
    where:
      AGB: "Aboveground biomass (kg)"
      ρ: "Wood density (g/cm³) from Global Wood Density Database"
      DBH: "Diameter at breast height (cm)"
      H: "Tree height (m)"
      
  carbon_conversion:
    biomass_to_carbon: "AGB × 0.47 (IPCC default)"
    carbon_to_CO2e: "C × 3.67 (molecular weight ratio)"
    
uncertainty:
  sources:
    - satellite_classification: "±8%"
    - allometric_equation: "±15%"
    - plot_sampling: "±10%"
  total_uncertainty: "±20% (95% confidence interval)"
```

---

## 4. Sensor Network Management

### IoT Sensor Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     SENSOR NETWORK TOPOLOGY                              │
└─────────────────────────────────────────────────────────────────────────┘

PROJECT SITE (Example: Nairobi Water Purification)
├─ Sensors Deployed: 12
│  ├─ Inlet: pH, Turbidity, Flow Rate
│  ├─ Filter Stage 1: Pressure, Turbidity
│  ├─ Filter Stage 2: Pressure, Turbidity
│  ├─ Storage Tank: Level, pH, Turbidity
│  └─ Outlet: pH, Turbidity, Flow Rate
│
├─ Communication:
│  └─ LoRaWAN (Long Range Wide Area Network)
│     ├─ Range: Up to 15km in rural areas
│     ├─ Power: Battery-powered (2-year lifetime)
│     ├─ Bandwidth: 250 bytes per message
│     └─ Frequency: 868 MHz (ISM band)
│
├─ Gateway:
│  └─ Location: Project office rooftop
│     ├─ Coverage: 10km radius
│     ├─ Backhaul: 4G LTE to cloud
│     └─ Redundancy: Dual SIM (2 carriers)
│
└─ Data Flow:
   Sensor → LoRaWAN Gateway → MQTT Broker → Data Pipeline
```

### Sensor Lifecycle Management

```typescript
interface SensorMetadata {
  id: string; // "SENSOR-WQ-247"
  type: 'pH' | 'turbidity' | 'flow' | 'soil_moisture' | 'temperature';
  manufacturer: string;
  model: string;
  serialNumber: string;
  
  // Deployment
  installDate: Date;
  location: {
    projectId: string;
    gps: { lat: number; lng: number; };
    elevation: number;
    description: string; // "Inlet pipe, 2m depth"
  };
  
  // Calibration
  lastCalibrated: Date;
  calibrationDue: Date; // 30 days from last
  calibrationCertificate: string; // IPFS hash
  calibrationStandards: string[]; // ["pH 4.0", "pH 7.0", "pH 10.0"]
  
  // Health
  status: 'active' | 'maintenance' | 'decommissioned';
  batteryLevel: number; // 0-100%
  signalStrength: number; // dBm
  lastSeen: Date;
  
  // Quality
  driftRate: number; // % per month
  failureCount: number;
  maintenanceHistory: MaintenanceRecord[];
}

interface SensorReading {
  sensorId: string;
  timestamp: Date;
  value: number;
  unit: string;
  
  // Quality flags
  flags: {
    calibrationOverdue: boolean;
    valueOutOfRange: boolean;
    batteryLow: boolean;
    signalWeak: boolean;
    rapidChange: boolean; // >10% change in 15 min
  };
  
  // Provenance
  signature: string; // Sensor cryptographic signature
  hash: string; // SHA-256 of reading data
  gatewayId: string;
  rssi: number; // Received signal strength
}

// Automated sensor health monitoring
function checkSensorHealth(sensor: SensorMetadata): HealthStatus {
  const alerts: Alert[] = [];
  
  // Calibration check
  const daysSinceCalibration = daysBetween(sensor.lastCalibrated, new Date());
  if (daysSinceCalibration > 30) {
    alerts.push({
      severity: 'warning',
      message: `Sensor ${sensor.id} calibration overdue by ${daysSinceCalibration - 30} days`
    });
  }
  
  // Battery check
  if (sensor.batteryLevel < 20) {
    alerts.push({
      severity: 'critical',
      message: `Sensor ${sensor.id} battery at ${sensor.batteryLevel}% - replace soon`
    });
  }
  
  // Connectivity check
  const hoursSinceLastSeen = hoursBetween(sensor.lastSeen, new Date());
  if (hoursSinceLastSeen > 4) {
    alerts.push({
      severity: 'critical',
      message: `Sensor ${sensor.id} offline for ${hoursSinceLastSeen} hours`
    });
  }
  
  // Drift check
  if (sensor.driftRate > 5) { // >5% drift per month
    alerts.push({
      severity: 'warning',
      message: `Sensor ${sensor.id} drifting ${sensor.driftRate}% per month - recalibrate`
    });
  }
  
  return {
    sensorId: sensor.id,
    overallStatus: alerts.some(a => a.severity === 'critical') ? 'unhealthy' : 'healthy',
    alerts
  };
}

// Automated drift detection
function detectSensorDrift(sensorId: string): DriftAnalysis {
  // Get recent calibration check readings
  const calibrationChecks = getCalibrationHistory(sensorId);
  
  if (calibrationChecks.length < 2) {
    return { driftDetected: false, message: 'Insufficient calibration history' };
  }
  
  // Compare sensor reading vs calibration standard
  // E.g., pH sensor in pH 7.0 buffer should read 7.0 ± 0.1
  const recentCheck = calibrationChecks[0];
  const previousCheck = calibrationChecks[1];
  
  const recentError = recentCheck.measured - recentCheck.standard;
  const previousError = previousCheck.measured - previousCheck.standard;
  
  const driftPerDay = (recentError - previousError) / daysBetween(previousCheck.date, recentCheck.date);
  
  if (Math.abs(driftPerDay) > 0.01) { // >0.01 pH units drift per day
    return {
      driftDetected: true,
      driftRate: driftPerDay,
      recommendation: 'Recalibrate immediately',
      severity: Math.abs(driftPerDay) > 0.05 ? 'critical' : 'warning'
    };
  }
  
  return { driftDetected: false, message: 'Sensor within acceptable drift range' };
}
```

---

## 5. Satellite Data Processing Pipeline

### Automated Satellite Imagery Analysis

```python
# Sentinel-2 NDVI Time Series Analysis
# Detects forest restoration or degradation

import rasterio
import numpy as np
from datetime import datetime, timedelta
from scipy import stats

class SatelliteChangeDetection:
    def __init__(self, project_boundary):
        self.boundary = project_boundary
        self.ndvi_threshold_forest = 0.6
        self.min_change_percent = 10
        
    def download_sentinel2(self, start_date, end_date):
        """
        Download Sentinel-2 imagery from Copernicus Open Access Hub
        """
        from sentinelsat import SentinelAPI
        
        api = SentinelAPI('user', 'password', 'https://scihub.copernicus.eu/dhus')
        
        products = api.query(
            area=self.boundary.wkt,
            date=(start_date, end_date),
            platformname='Sentinel-2',
            cloudcoverpercentage=(0, 30)  # Max 30% cloud cover
        )
        
        for product_id in products:
            api.download(product_id)
            
        return products
    
    def calculate_ndvi(self, red_band, nir_band):
        """
        NDVI = (NIR - Red) / (NIR + Red)
        Range: -1 to +1 (vegetation is >0.2, dense forest >0.6)
        """
        # Avoid division by zero
        denominator = nir_band + red_band
        denominator = np.where(denominator == 0, 0.0001, denominator)
        
        ndvi = (nir_band - red_band) / denominator
        
        return ndvi
    
    def detect_forest_change(self, baseline_date, current_date):
        """
        Compare NDVI between baseline and current date
        Return: hectares of forest gain/loss
        """
        # Load imagery
        baseline_red = rasterio.open(f'S2_{baseline_date}_B04.tif').read(1)
        baseline_nir = rasterio.open(f'S2_{baseline_date}_B08.tif').read(1)
        
        current_red = rasterio.open(f'S2_{current_date}_B04.tif').read(1)
        current_nir = rasterio.open(f'S2_{current_date}_B08.tif').read(1)
        
        # Calculate NDVI
        baseline_ndvi = self.calculate_ndvi(baseline_red, baseline_nir)
        current_ndvi = self.calculate_ndvi(current_red, current_nir)
        
        # Classify as forest (NDVI >0.6)
        baseline_forest = baseline_ndvi > self.ndvi_threshold_forest
        current_forest = current_ndvi > self.ndvi_threshold_forest
        
        # Detect change
        forest_gain = np.logical_and(~baseline_forest, current_forest)
        forest_loss = np.logical_and(baseline_forest, ~current_forest)
        
        # Calculate area (10m × 10m pixels = 100 m² = 0.01 ha per pixel)
        pixel_area_ha = 0.01
        
        gain_ha = np.sum(forest_gain) * pixel_area_ha
        loss_ha = np.sum(forest_loss) * pixel_area_ha
        
        # Statistical significance test
        change_percent = (gain_ha - loss_ha) / np.sum(baseline_forest) * pixel_area_ha * 100
        
        return {
            'baseline_date': baseline_date,
            'current_date': current_date,
            'forest_gain_ha': gain_ha,
            'forest_loss_ha': loss_ha,
            'net_change_ha': gain_ha - loss_ha,
            'change_percent': change_percent,
            'significant': abs(change_percent) > self.min_change_percent,
            'confidence': self.calculate_confidence(baseline_ndvi, current_ndvi)
        }
    
    def calculate_confidence(self, baseline_ndvi, current_ndvi):
        """
        Confidence based on:
        1. Cloud-free pixels (atmospheric correction quality)
        2. NDVI variance (homogeneity of change)
        3. Temporal consistency (multiple dates show same trend)
        """
        # Quality flags from Sen2Cor atmospheric correction
        quality_mask = self.get_quality_mask()
        
        valid_pixels = np.sum(quality_mask) / quality_mask.size
        
        # NDVI variance
        ndvi_change = current_ndvi - baseline_ndvi
        ndvi_variance = np.var(ndvi_change[quality_mask])
        
        # Confidence score (0-100%)
        confidence = (
            valid_pixels * 0.4 +  # 40% weight on pixel quality
            (1 - min(ndvi_variance, 1)) * 0.3 +  # 30% weight on homogeneity
            self.temporal_consistency() * 0.3  # 30% weight on time series
        ) * 100
        
        return confidence
    
    def temporal_consistency(self):
        """
        Check if change is consistent across multiple dates
        Not a one-time anomaly
        """
        # Get NDVI for last 6 observations
        ndvi_series = self.get_ndvi_time_series(months=6)
        
        # Fit linear trend
        x = np.arange(len(ndvi_series))
        slope, intercept, r_value, p_value, std_err = stats.linregr(x, ndvi_series)
        
        # High R² = consistent trend
        return r_value ** 2
```

### Ground Truth Validation

```python
class GroundTruthValidator:
    """
    Validates satellite-derived metrics with field measurements
    """
    
    def validate_forest_restoration(self, satellite_result, ground_survey):
        """
        Cross-check satellite NDVI change with actual tree count
        """
        # Satellite says: +15 hectares of forest
        satellite_gain = satellite_result['net_change_ha']
        
        # Ground survey counted: 450 trees planted on 20 plots of 0.04 ha each
        trees_per_plot = ground_survey['tree_count'] / ground_survey['num_plots']
        plot_area_ha = 0.04
        total_surveyed_ha = ground_survey['num_plots'] * plot_area_ha
        
        # Extrapolate to full project area
        tree_density = trees_per_plot / plot_area_ha  # trees per hectare
        expected_trees = satellite_gain * tree_density
        
        # Compare with actual count
        actual_trees = ground_survey['total_trees']
        
        agreement = (actual_trees / expected_trees) * 100
        
        if 80 <= agreement <= 120:
            return {
                'validated': True,
                'agreement_percent': agreement,
                'message': f'Satellite and ground truth agree within 20% ({agreement:.1f}%)'
            }
        else:
            return {
                'validated': False,
                'agreement_percent': agreement,
                'message': f'Discrepancy detected: {agreement:.1f}% agreement (expected 80-120%)',
                'action': 'Manual review required'
            }
    
    def validate_soil_carbon(self, satellite_indices, lab_results):
        """
        Check if satellite vegetation indices correlate with soil carbon change
        """
        # Soil organic carbon from lab: +0.8% increase over baseline
        soc_change = lab_results['current_soc'] - lab_results['baseline_soc']
        
        # Satellite NDVI change: +0.15 increase
        ndvi_change = satellite_indices['current_ndvi'] - satellite_indices['baseline_ndvi']
        
        # Literature: 0.1 NDVI increase ≈ 0.5% SOC increase (site-specific calibration)
        expected_soc_change = ndvi_change * 5  # Calibration factor
        
        agreement = (soc_change / expected_soc_change) * 100 if expected_soc_change > 0 else 0
        
        return {
            'lab_soc_change': soc_change,
            'expected_from_satellite': expected_soc_change,
            'agreement_percent': agreement,
            'validated': 70 <= agreement <= 130
        }
```

---

## 6. Data Quality Framework

### Quality Assurance Metrics

```typescript
interface DataQualityReport {
  timestamp: Date;
  period: string; // "2026-03-01 to 2026-03-07"
  
  completeness: {
    satellite_coverage: number; // % of project area with cloud-free imagery
    iot_uptime: number; // % of sensors transmitting
    ground_truth_completion: number; // % of planned surveys completed
    overall: number; // Weighted average
  };
  
  accuracy: {
    sensor_calibration_compliance: number; // % sensors calibrated on schedule
    cross_validation_agreement: number; // % of multi-source checks that agree
    anomaly_rate: number; // % of readings flagged as suspicious
    overall: number;
  };
  
  timeliness: {
    real_time_latency_p95: number; // 95th percentile latency (seconds)
    batch_processing_delay: number; // Hours from data collection to availability
    overall: string; // "Excellent" | "Good" | "Needs Improvement"
  };
  
  consistency: {
    temporal_consistency: number; // % of time series without unexplained jumps
    spatial_consistency: number; // % of neighboring sensors that agree
    cross_source_consistency: number; // Satellite vs IoT vs Ground truth
    overall: number;
  };
  
  alerts: Alert[];
  recommendations: string[];
}

// Daily quality assurance check
async function generateDailyQAReport(): Promise<DataQualityReport> {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Completeness
  const satelliteImages = await getSatelliteImages(weekAgo, today);
  const cloudFreePercent = satelliteImages.filter(img => img.cloudCover < 30).length / satelliteImages.length * 100;
  
  const allSensors = await getSensors();
  const activeSensors = allSensors.filter(s => s.status === 'active').length;
  const iotUptime = activeSensors / allSensors.length * 100;
  
  const plannedSurveys = await getPlannedSurveys(weekAgo, today);
  const completedSurveys = plannedSurveys.filter(s => s.status === 'completed').length;
  const groundTruthCompletion = completedSurveys / plannedSurveys.length * 100;
  
  const completeness = {
    satellite_coverage: cloudFreePercent,
    iot_uptime: iotUptime,
    ground_truth_completion: groundTruthCompletion,
    overall: (cloudFreePercent * 0.4 + iotUptime * 0.4 + groundTruthCompletion * 0.2)
  };
  
  // Accuracy
  const calibrationCompliant = allSensors.filter(s => 
    daysBetween(s.lastCalibrated, today) <= 30
  ).length / allSensors.length * 100;
  
  const validationChecks = await getCrossValidationChecks(weekAgo, today);
  const agreementRate = validationChecks.filter(v => v.agreement >= 80).length / validationChecks.length * 100;
  
  const allReadings = await getSensorReadings(weekAgo, today);
  const flaggedReadings = allReadings.filter(r => r.flags.valueOutOfRange || r.flags.rapidChange).length;
  const anomalyRate = flaggedReadings / allReadings.length * 100;
  
  const accuracy = {
    sensor_calibration_compliance: calibrationCompliant,
    cross_validation_agreement: agreementRate,
    anomaly_rate: anomalyRate,
    overall: (calibrationCompliant * 0.4 + agreementRate * 0.4 + (100 - anomalyRate) * 0.2)
  };
  
  // Timeliness
  const realtimeLatencies = await getRealtimeLatencies(weekAgo, today);
  const p95Latency = percentile(realtimeLatencies, 95);
  
  const batchJobs = await getBatchProcessingJobs(weekAgo, today);
  const avgDelay = batchJobs.reduce((sum, job) => sum + job.processingDelay, 0) / batchJobs.length;
  
  const timeliness = {
    real_time_latency_p95: p95Latency,
    batch_processing_delay: avgDelay,
    overall: p95Latency < 60 && avgDelay < 4 ? 'Excellent' : p95Latency < 300 && avgDelay < 12 ? 'Good' : 'Needs Improvement'
  };
  
  // Generate report
  return {
    timestamp: today,
    period: `${weekAgo.toISOString().split('T')[0]} to ${today.toISOString().split('T')[0]}`,
    completeness,
    accuracy,
    timeliness,
    consistency: await calculateConsistency(weekAgo, today),
    alerts: await generateAlerts(completeness, accuracy),
    recommendations: generateRecommendations(completeness, accuracy)
  };
}
```

---

## 7. Data Provenance & Chain of Custody

### Immutable Data Lineage

```typescript
interface DataProvenance {
  datasetId: string; // "soil-carbon-project-89-2026-03-04"
  version: string; // "v1.0.0"
  
  origin: {
    source: 'satellite' | 'iot' | 'ground_truth' | 'external';
    provider: string; // "Sentinel-2" | "Sensor #247" | "Lab Report #5432"
    collectionDate: Date;
    collectionMethod: string;
    collectorId: string; // Person or device
  };
  
  processing: {
    rawDataHash: string; // SHA-256 of original data
    transformations: Transformation[];
    algorithm: string;
    algorithmVersion: string;
    parameters: Record<string, any>;
    processedDataHash: string;
  };
  
  validation: {
    validatorId: string;
    validationDate: Date;
    checks: ValidationCheck[];
    approved: boolean;
    approverSignature: string; // Cryptographic signature
  };
  
  storage: {
    primaryLocation: string; // "PostgreSQL table sensors.readings"
    backupLocations: string[]; // ["S3 bucket", "IPFS"]
    archivalLocation: string; // "Arweave"
    retentionPolicy: string; // "30 years"
  };
  
  lineage: {
    parentDatasets: string[]; // Datasets this was derived from
    childDatasets: string[]; // Datasets derived from this
    relatedDatasets: string[]; // Cross-validated with
  };
  
  metadata: {
    creator: string;
    license: string; // "CC BY 4.0"
    citation: string;
    doi: string; // Digital Object Identifier for academic citation
  };
}

interface Transformation {
  step: number;
  operation: string; // "atmospheric_correction" | "ndvi_calculation" | "aggregation"
  inputHash: string;
  outputHash: string;
  timestamp: Date;
  parameters: Record<string, any>;
  code: string; // Link to GitHub commit of processing code
}

// Generate provenance record
function createProvenanceRecord(
  sensor: SensorMetadata,
  reading: SensorReading
): DataProvenance {
  const rawDataHash = sha256(JSON.stringify(reading));
  
  return {
    datasetId: `sensor-${sensor.id}-${reading.timestamp.toISOString()}`,
    version: "v1.0.0",
    
    origin: {
      source: 'iot',
      provider: `${sensor.manufacturer} ${sensor.model}`,
      collectionDate: reading.timestamp,
      collectionMethod: "Automated sensor reading via LoRaWAN",
      collectorId: sensor.id
    },
    
    processing: {
      rawDataHash,
      transformations: [],
      algorithm: "Direct sensor reading (no transformation)",
      algorithmVersion: "N/A",
      parameters: {},
      processedDataHash: rawDataHash
    },
    
    validation: {
      validatorId: "automated-qa-system",
      validationDate: new Date(),
      checks: validateSensorReading(reading),
      approved: !reading.flags.valueOutOfRange,
      approverSignature: signData(rawDataHash, systemPrivateKey)
    },
    
    storage: {
      primaryLocation: "TimescaleDB sensors.readings",
      backupLocations: ["S3 s3://rve-data/sensors/", "IPFS"],
      archivalLocation: `Arweave ${uploadToArweave(reading)}`,
      retentionPolicy: "30 years minimum"
    },
    
    lineage: {
      parentDatasets: [],
      childDatasets: [],
      relatedDatasets: []
    },
    
    metadata: {
      creator: "RVE Data Engineering Team",
      license: "CC BY 4.0",
      citation: `RVE (2026). Sensor ${sensor.id} readings. DOI: 10.xxxx/rve.sensor.${sensor.id}`,
      doi: `10.xxxx/rve.sensor.${sensor.id}`
    }
  };
}
```

---

## 8. Scientific Reproducibility

### Versioned Analysis Workflows

```yaml
analysis_workflow:
  name: "Soil Carbon Sequestration Rate Calculation"
  version: "2.1.0"
  doi: "10.5281/zenodo.1234567"
  
  inputs:
    - dataset: "soil-samples-project-89-v1.2.3"
      type: "lab_results"
      format: "CSV"
      hash: "sha256:7f3a9b..."
      
    - dataset: "project-89-baseline-v1.0.0"
      type: "baseline_measurement"
      format: "CSV"
      hash: "sha256:2e4c8d..."
      
  parameters:
    depth_cm: 30
    bulk_density_g_cm3: 1.3
    sampling_area_ha: 1.0
    confidence_level: 0.95
    
  processing_steps:
    - step: 1
      operation: "Calculate SOC stock (tonnes/ha)"
      formula: "SOC_stock = SOC_% × depth_cm × bulk_density × 100"
      code: "https://github.com/rve/analysis/blob/v2.1.0/soc_calculation.py#L45"
      
    - step: 2
      operation: "Calculate change from baseline"
      formula: "ΔSOC = SOC_current - SOC_baseline"
      code: "https://github.com/rve/analysis/blob/v2.1.0/soc_calculation.py#L67"
      
    - step: 3
      operation: "Annualize rate"
      formula: "Rate = ΔSOC / years_elapsed"
      code: "https://github.com/rve/analysis/blob/v2.1.0/soc_calculation.py#L82"
      
    - step: 4
      operation: "Calculate uncertainty"
      method: "Monte Carlo simulation (10,000 iterations)"
      code: "https://github.com/rve/analysis/blob/v2.1.0/uncertainty.py#L23"
      
  outputs:
    - result: "soc_sequestration_rate_project_89_2026Q1.csv"
      hash: "sha256:9a2f1e..."
      value: "1.2 tonnes CO2e/ha/year"
      uncertainty: "±0.3 tonnes CO2e/ha/year (95% CI)"
      
  environment:
    python_version: "3.9.7"
    packages:
      - numpy==1.21.0
      - pandas==1.3.0
      - scipy==1.7.0
    
  reproducibility:
    docker_image: "rve/analysis:2.1.0"
    command: "python soc_calculation.py --config config.yaml"
    expected_runtime: "< 5 minutes"
    
  peer_review:
    reviewer: "Dr. Jane Smith, Soil Scientist"
    review_date: "2026-02-28"
    status: "Approved"
    comments: "Methodology consistent with IPCC guidelines"
```

---

[Continuing in next message due to length...]
